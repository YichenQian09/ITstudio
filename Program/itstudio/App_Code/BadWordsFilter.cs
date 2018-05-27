using System;
using System.Collections;
using System.Collections.Generic;
using System.Data;
using System.IO;
using System.Linq;
using System.Web;

/// <summary>
/// BadWordsFilter 的摘要说明
/// </summary>
public class BadWordsFilter
{
    private HashSet<string> hash = new HashSet<string>(); //关键字
    private byte[] fastCheck = new byte[char.MaxValue];
    private byte[] fastLength = new byte[char.MaxValue];
    private BitArray charCheck = new BitArray(char.MaxValue);
    private BitArray endCheck = new BitArray(char.MaxValue);
    private int maxWordLength = 0;
    private int minWordLength = int.MaxValue;
    public BadWordsFilter()
    {
        //
        // TODO: 在此处添加构造函数逻辑
        //
    }

    public void Init()
    {
        string badWordFilePath = System.Web.HttpContext.Current.Server.MapPath("~/BackStage/Backstage/File/") + "BadWords.txt";
        string srList=string.Empty;
        if (File.Exists(badWordFilePath))
        {
            StreamReader sr = new StreamReader(badWordFilePath, System.Text.Encoding.Default);
            srList = sr.ReadToEnd();
            sr.Close();
            sr.Dispose();
        }
        string[] badWords = srList.Split('|');
        foreach(string word in badWords)
        {
            maxWordLength = Math.Max(maxWordLength, word.Length);
            minWordLength = Math.Min(minWordLength, word.Length);
            for (int i = 0; i < 7 && i < word.Length; i++)
            {
                fastCheck[word[i]] |= (byte)(1 << i);
            }
            for (int i = 7; i < word.Length; i++)
            {
                fastCheck[word[i]] |= 0x80;
            }
            if (word.Length == 1)
            {
                charCheck[word[0]] = true;
            }
            else
            {
                fastLength[word[0]] |= (byte)(1 << (Math.Min(7, word.Length - 2)));
                endCheck[word[word.Length - 1]] = true;
                hash.Add(word);
            }
        }
    }

    public string StringClear(string strMessage)
    {
        string[] aryReg = { "'","!","@","#","$","%","^","&","*","(",")","（","）", "<", ">","~","+","=",":","：","！","@","#","￥","……","·", "\"\"", ",", ".", ">=", "=<", "-", "_", ";", "||", "[", "]", "/", "-", "|", " ", };
        for (int i = 0; i < aryReg.Length; i++)
        {
            strMessage = strMessage.Replace(aryReg[i], string.Empty);
        }
        return strMessage;
    }

    public string Filter(string text, string mask)
    {
        throw new NotImplementedException();
    }
    //检查是否有关键字
    public bool HasBadWord(string txt)
    {
        string text = StringClear(txt);//过滤特殊字符
        int index = 0;
        while (index < text.Length)
        {
            int count = 1;
            if (index > 0 || (fastCheck[text[index]] & 1) == 0)
            {
                while (index < text.Length - 1 && (fastCheck[text[++index]] & 1) == 0) ;
            }
            char begin = text[index];
            if (minWordLength == 1 && charCheck[begin])
            {
                return true;
            }
            for (int j = 1; j <= Math.Min(maxWordLength, text.Length - index - 1); j++)
            {
                char current = text[index + j];
                if ((fastCheck[current] & 1) == 0)
                {
                    ++count;
                }
                if ((fastCheck[current] & (1 << Math.Min(j, 7))) == 0)
                {
                    break;
                }
                if (j + 1 >= minWordLength)
                {
                    if ((fastLength[begin] & (1 << Math.Min(j - 1, 7))) > 0 && endCheck[current])
                    {
                        string sub = text.Substring(index, j + 1);
                        if (hash.Contains(sub))
                        {
                            return true;
                        }
                    }
                }
            }
            index += count;
        }
        return false;
    }
}

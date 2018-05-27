using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Web;

/// <summary>
/// RSA 的摘要说明
/// </summary>
public class RSA
{
    public RSA()
    {
        //
        // TODO: 在此处添加构造函数逻辑
        //
    }
    #region RSA 的密钥产生  
    /// <summary>  
    /// RSA产生密钥  
    /// </summary>  
    /// <param name="xmlKeys">私钥</param>  
    /// <param name="xmlPublicKey">公钥</param>  
    static public void RSAKey(out string xmlKeys, out string xmlPublicKey)
    {
        try
        {
            System.Security.Cryptography.RSACryptoServiceProvider rsa = new RSACryptoServiceProvider();
            xmlKeys = rsa.ToXmlString(true);
            xmlPublicKey = rsa.ToXmlString(false);
        }
        catch (Exception ex)
        {
            throw ex;
        }
    }
    #endregion
    #region RSA加密函数 
    /// <summary>  
    /// RSA的加密函数  
    /// </summary>  
    /// <param name="xmlPublicKey">公钥</param>  
    /// <param name="encryptString">待加密的字符串</param>  
    /// <returns></returns>  
    static public string RSAEncrypt(string xmlPublicKey, string encryptString)
    {
        try
        {
            byte[] PlainTextBArray;
            byte[] CypherTextBArray;
            string Result;
            System.Security.Cryptography.RSACryptoServiceProvider rsa = new RSACryptoServiceProvider();
            rsa.FromXmlString(xmlPublicKey);
            //PlainTextBArray = (new UnicodeEncoding()).GetBytes(encryptString);
            UnicodeEncoding ByteConverter = new UnicodeEncoding();
            //Create byte arrays to hold original, encrypted, and decrypted data.
            PlainTextBArray = ByteConverter.GetBytes(encryptString);
            CypherTextBArray = rsa.Encrypt(PlainTextBArray, false);
            Result = Convert.ToBase64String(CypherTextBArray);
            return Result;
        }
        catch (Exception ex)
        {
            throw ex;
        }
    }
   
    #endregion
    #region RSA的解密函数 
    /// <summary>  
    /// RSA的解密函数  
    /// </summary>  
    /// <param name="xmlPrivateKey">私钥</param>  
    /// <param name="decryptString">待解密的字符串</param>  
    /// <returns></returns>  
    static public string RSADecrypt(string xmlPrivateKey, string decryptString)
    {
        try
        {
            byte[] PlainTextBArray;
            byte[] DypherTextBArray;
            string Result;
            System.Security.Cryptography.RSACryptoServiceProvider rsa = new RSACryptoServiceProvider();
            rsa.FromXmlString(xmlPrivateKey);
            PlainTextBArray = Convert.FromBase64String(decryptString);
            DypherTextBArray = rsa.Decrypt(PlainTextBArray, false);
            Result = (new UnicodeEncoding()).GetString(DypherTextBArray);
            return Result;
        }
        catch (Exception ex)
        {
            throw ex;
        }
    }
    #endregion
}
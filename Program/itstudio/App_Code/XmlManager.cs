using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Xml;

/// <summary>
/// XmlManager 的摘要说明
/// </summary>
public class XmlManager
{
    public XmlManager()
    {
        //
        // TODO: 在此处添加构造函数逻辑
        //
    }

    public bool Add(string addressContent)//增加封禁的IP 写入IMXML
    {
        try
        {
            XmlDocument xmlDoc = new XmlDocument();
            xmlDoc.Load(System.Web.HttpContext.Current.Server.MapPath("~/BackStage/Backstage/File/IPXMLFile.xml"));
            XmlNode rootElement = xmlDoc.SelectSingleNode("IPList");//查找根节点
            XmlElement IPElement = xmlDoc.CreateElement("IP");//创建一个<IP>节点 
            IPElement.SetAttribute("IPAddress", addressContent);//设置该节点IPAdress属性 
                                                              //  websiteElement.SetAttribute("ISBN", "1-1111-1");//设置该节点ISBN属性 
            //XmlElement AdressElement = xmlDoc.CreateElement("IPAdress");
            //AdressElement.InnerText = adressContent;//设置IP
            //IPElement.AppendChild(AdressElement);//添加到<IP>节点中 
            XmlElement TimeElement = xmlDoc.CreateElement("Time");
            TimeElement.InnerText = DateTime.Now.ToString();
            IPElement.AppendChild(TimeElement);

            rootElement.AppendChild(IPElement);//添加到<Websites>节点中 

            xmlDoc.Save(System.Web.HttpContext.Current.Server.MapPath("~/BackStage/Backstage/File/IPXMLFile.xml"));//存储

            return true;
        }
        catch
        {
            return false;
        }
    }

    
    public int Editor(string adressContent)//在十秒钟之后操作的IP地址会被解禁 删除
    {
        try
        {
            int ans = 1;
            XmlDocument xmlDoc = new XmlDocument();
            xmlDoc.Load(System.Web.HttpContext.Current.Server.MapPath("~/BackStage/Backstage/File/IPXMLFile.xml"));
            XmlNode rootElement = xmlDoc.SelectSingleNode("IPList");
            XmlNodeList nodeList = xmlDoc.SelectSingleNode("IPList").ChildNodes;//获取IPList节点的所有子节点 
            foreach (XmlNode xn in nodeList)//遍历所有子节点 
            {
                XmlElement xe = (XmlElement)xn;//将子节点类型转换为XmlElement类型 

                XmlNodeList nls = xe.ChildNodes;
                foreach (XmlNode xn1 in nls)//遍历 
                {
                    XmlElement xe2 = (XmlElement)xn1;//转换类型 

                    DateTime lastTime = Convert.ToDateTime(xe2.InnerText);

                    DateTime now = DateTime.Now;

                    TimeSpan ts = now - lastTime;

                    if (xe.GetAttribute("IPAddress") == adressContent && ts.TotalSeconds < 10)
                    {
                       // HttpContext.Current.Response.Write("<script>alert('请一分钟后再操作')</script>");
                        ans = 2;
                    }
                    else if (ts.TotalSeconds > 10)
                    {
                        rootElement.RemoveChild(xe);

                    }
                }
                //    XmlNodeList nls = xe.ChildNodes;//继续获取xe子节点的所有子节点 
                //foreach (XmlNode xn1 in nls)//遍历 
                //{
                //    XmlElement xe2 = (XmlElement)xn1;//转换类型 
                //    if (xe2.Name == "IPAdress")//如果找到 
                //    {
                //        xe2.InnerText = "作者";//则修改
                //    }
                //}

            }
            xmlDoc.Save(System.Web.HttpContext.Current.Server.MapPath("~/BackStage/Backstage/File/IPXMLFile.xml"));//保存。

            return ans;
        }
        catch
        {
            return 0;
        }
    }
}
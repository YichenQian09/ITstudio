<%@ WebHandler Language="C#" Class="PhotoCutHandler" %>

using System;
using System.Web;
using System.Drawing;
using System.Collections.Generic;
using System.Linq;
using System.Text.RegularExpressions;
using System.IO;
using System.Web.SessionState;
using System.Drawing.Imaging;
using System.Runtime.Serialization.Formatters.Binary;


public class PhotoCutHandler : IHttpHandler,IRequiresSessionState {

    public void ProcessRequest(HttpContext context)
    {
        context.Response.ContentType = "text/plain";
        context.Response.Charset = "utf-8";
        string src0 = context.Server.UrlDecode(context.Request["img"]);
        string src1 = src0.Replace(" ", "+");
        string src = src1.Replace("data:image/png;base64,", "");
        string name=DateTime.Now.ToString("yyyyMMddhhmmss") + ".jpg";
        string filePath =System.Web.HttpContext.Current.Server.MapPath("~/BackStage/Backstage/File/")+name;
        byte[] bytes = Convert.FromBase64String(src);
        Stream stream = new MemoryStream(bytes);
        System.Drawing.Bitmap img = (System.Drawing.Bitmap)System.Drawing.Bitmap.FromStream(stream, false); //转换成Bitmap
        img.Save(filePath, System.Drawing.Imaging.ImageFormat.Png);
        string path ="File/" + name;
        HttpCookie cookies = new HttpCookie("url");//添加到cookie
        cookies.Value = path;
        cookies.Expires = DateTime.Now.AddMinutes(6);
        context.Response.Cookies.Add(cookies);


    }

    public bool IsReusable {
        get {
            return false;
        }
    }

}
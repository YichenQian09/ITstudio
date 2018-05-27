<%@ WebHandler Language="C#" Class="RSAHandler"  %>

using System;
using System.Web;
using System.Collections.Generic;
using Newtonsoft.Json;
public class RSAHandler : IHttpHandler {

    public void ProcessRequest (HttpContext context) {
        context.Response.ContentType = "text/plain";
        string publicKeys = context.Request["publicKeys"];

        string pwd = context.Request["txtcontent"];
            //调用加密算法
        string rsaPwd = RSA.RSAEncrypt(publicKeys, pwd);
        string json = JsonConvert.SerializeObject(rsaPwd);

        context.Response.Write(json);
    }

    public bool IsReusable {
        get {
            return false;
        }
    }

}
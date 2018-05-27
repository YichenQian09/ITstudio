<%@ WebHandler Language="C#" Class="MessageHandler" %>

using System;
using System.Web;
using System.Linq;
using System.Collections.Generic;
using Newtonsoft.Json;

public class MessageHandler : IHttpHandler {

    public void ProcessRequest (HttpContext context) {
        context.Response.ContentType = "text/plain";
        int size = Convert.ToInt32( context.Request["pageSize"]);
        int index = Convert.ToInt32( context.Request["pageNumber"])-1;
        using (var db = new ITShowEntities())
        {
            List<Message> list = (from it in db.Message orderby it.MessageTime descending select it).Skip(index*size).Take(size).ToList();
            //foreach(var item in list)
            //{
            //    item.MessageComment = HttpContext.Current.Server.HtmlEncode(item.MessageComment);
            //}
            //foreach(var item in list)
            //{
            //   item.MessageTime=Convert.ToDateTime( item.MessageTime.GetDateTimeFormats('g')[0].ToString());
            //}
            string json = JsonConvert.SerializeObject(list);
            context.Response.Write(json);
        }
    }

    public bool IsReusable {
        get {
            return false;
        }
    }

}
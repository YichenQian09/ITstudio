<%@ WebHandler Language="C#" Class="EventHandler" %>

using System;
using System.Web;
    using System.Linq;
using System.Collections.Generic;
using Newtonsoft.Json;

public class EventHandler : IHttpHandler {
    
    public void ProcessRequest (HttpContext context) {
        context.Response.ContentType = "text/plain";

         using (var db = new ITShowEntities())
        {
            List<Event> list = (from it in db.Event orderby it.EventTime select it).ToList();

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
<%@ WebHandler Language="C#" Class="WorksHandler" %>

using System;
using System.Web;
using System.Linq;
using System.Collections.Generic;
using Newtonsoft.Json;


public class WorksHandler : IHttpHandler {
    
    public void ProcessRequest (HttpContext context) {
        context.Response.ContentType = "text/plain";
        using (var db = new ITShowEntities())
        {
            List<Works> list = (from it in db.Works select it).ToList();

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
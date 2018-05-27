<%@ WebHandler Language="C#" Class="BindHandler" %>

using System;
using System.Web;
using System.Linq;
using System.Runtime.Serialization.Json;
using System.Collections.Generic;
using Newtonsoft.Json;

public class BindHandler : IHttpHandler {

    public class InforId
    {
        public int id { set; get; }
        public string url { set; get; }
    }




    public void ProcessRequest (HttpContext context) {
        context.Response.ContentType = "text/plain";
        int type =Convert.ToInt32( context.Request["type"]);
        var s = context.Request.Params["idInfor"];
        List<InforId> list = JsonConvert.DeserializeObject<List<InforId>>(s);


        using (var db=new ITShowEntities())
        {
            foreach(var item in list)
            {
               string urls="";
               if(type==1)
                urls = (from it in db.Member where it.MemberId == item.id select it.MemberImage).FirstOrDefault();
               else if(type==2)
                         urls = (from it in db.Works where it.WorksId == item.id select it.WorksImage).FirstOrDefault();
               else
                         urls = (from it in db.Event where it.EventId == item.id select it.EventImage).FirstOrDefault();
                item.url = urls;

            }
        }
        string json = JsonConvert.SerializeObject(list);
        context.Response.Write(json);
    }

    public bool IsReusable {
        get {
            return false;
        }
    }

}
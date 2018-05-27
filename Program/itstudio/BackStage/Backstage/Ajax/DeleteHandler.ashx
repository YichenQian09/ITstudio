<%@ WebHandler Language="C#" Class="DeleteHandler" %>

using System;
using System.Web;
using System.Linq;
using System.Collections.Generic;
using Newtonsoft.Json;


public class DeleteHandler : IHttpHandler
{

    public class InforId
    {
        public int id { set; get; }
    }

    public void ProcessRequest(HttpContext context)
    {
        context.Response.ContentType = "text/plain";
        int type = Convert.ToInt32(context.Request["type"]);
        var s = context.Request.Params["idInfor"];
        List<InforId> list = JsonConvert.DeserializeObject<List<InforId>>(s);


        using (var db = new ITShowEntities())
        {
            if (type == 1)
            {
                foreach (var item in list)
                {
                    Application person = (from it in db.Application where it.ApplicationId == item.id select it).FirstOrDefault();

                    db.Application.Remove(person);

                    db.SaveChanges();
                }
            }
            else if(type==2)
            {
                foreach (var item in list)
                {
                    Message person = (from it in db.Message where it.MessageId == item.id select it).FirstOrDefault();

                    db.Message.Remove(person);

                    db.SaveChanges();
                }
            }
            else
            {
                    foreach (var item in list)
                {
                    Admin person = (from it in db.Admin where it.AdminId == item.id select it).FirstOrDefault();

                    db.Admin.Remove(person);

                    db.SaveChanges();
                }
            }
        }
    }

    public bool IsReusable
    {
        get
        {
            return false;
        }
    }

}
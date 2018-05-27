<%@ WebHandler Language="C#" Class="MemberHandler" %>

using System;
using System.Web;
using System.Linq;
using System.Collections.Generic;
using Newtonsoft.Json;

public class MemberHandler : IHttpHandler
{

    public void ProcessRequest(HttpContext context)
    {
        context.Response.ContentType = "text/plain";
        string year=context.Request["memberyear"];
        using (var db = new ITShowEntities())
        {
        	if(year == "0")
        	{
        		List<Member> list = (from it in db.Member orderby it.MemberYear select it).ToList();

           	 	string json = JsonConvert.SerializeObject(list);

            	context.Response.Write(json);
        	}
        	else
        	{
            	List<Member> list = (from it in db.Member where it.MemberYear==year select it).ToList();

           	 	string json = JsonConvert.SerializeObject(list);

            	context.Response.Write(json);
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
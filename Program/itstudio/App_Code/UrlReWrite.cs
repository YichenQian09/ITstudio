using System;
using System.Collections.Generic;
using System.Text;
using System.Web;
using System.Web.UI;
using System.Web.SessionState;
using System.Configuration;

namespace MyHttp
{
    /// <summary>
    /// UrlReWrite 的摘要说明
    /// </summary>
    public class UrlReWrite : IHttpModule
    {
        /// <summary>
        /// 单个IP最大连接限制数量
        /// </summary>
        private int rowCount = Convert.ToInt32(ConfigurationManager.ConnectionStrings["HttpRowCount"].ToString());
        /// <summary>
        /// 指定区域时间范围 单位分
        /// </summary>
        private int httpTime = Convert.ToInt32(ConfigurationManager.ConnectionStrings["HttpTime"].ToString());

        public void Init(HttpApplication application)
        {
            application.BeginRequest += (new
                 EventHandler(this.Application_BeginRequest));
            application.EndRequest += (new
                 EventHandler(this.Application_EndRequest));

        }

        //public void OnAcquireRequestState(Object sender, EventArgs e)
        //{
        //    HttpApplication Application = (HttpApplication)source;
        //    HttpContext ctx = Application.Context;
        //    //IP地址
        //    string isIp = ctx.Request.UserHostAddress;
        //    if (ctx.Application["time"] == null)
        //    {
        //        ctx.Application["time"] = DateTime.Now;
        //    }
        //    else
        //    {
        //        DateTime isTime = (DateTime)ctx.Application["time"];
        //        int timeTract = Convert.ToInt32(DateTime.Now.Subtract(isTime).Minutes.ToString());//时间差
        //        if (timeTract > (httpTime - 1))
        //        {
        //            //ctx.Response.Clear();
        //            //ctx.Response.Close();
        //            ctx.Application["time"] = null;
        //            ctx.Application["myip"] = null;
        //        }

        //    }
        //    if (ctx.Application["myip"] != null && ctx.Application["myip"] is CartIp)
        //    {
        //        CartIp cartIp = (CartIp)ctx.Application["myip"];
        //        cartIp.Insert(isIp);
        //        ctx.Application["myip"] = cartIp;
        //        if (cartIp.GetCount(isIp) > rowCount)//超过了限制数量
        //        {
        //            HttpContext.Current.Response.Redirect("test.aspx");
        //        }
        //    }
        //    else
        //    {
        //        CartIp cartIp = new CartIp();
        //        cartIp.Insert(isIp);
        //        HttpContext.Current.Application["myip"] = cartIp;
        //    }
        //}

        private void Application_BeginRequest(Object source, EventArgs e)
        {
            HttpApplication Application = (HttpApplication)source;
            HttpContext ctx = Application.Context;
            //IP地址
            string isIp = ctx.Request.UserHostAddress;
            if (ctx.Application["time"] == null)
            {
                ctx.Application["time"] = DateTime.Now;
            }
            else
            {
                DateTime isTime = (DateTime)ctx.Application["time"];
                int timeTract = Convert.ToInt32(DateTime.Now.Subtract(isTime).Minutes.ToString());//时间差
                if (timeTract > (httpTime - 1))
                {
                    //ctx.Response.Clear();
                    //ctx.Response.Close();
                    ctx.Application["time"] = null;
                    ctx.Application["myip"] = null;
                }

            }
            if (ctx.Application["myip"] != null && ctx.Application["myip"] is CartIp)
            {
                CartIp cartIp = (CartIp)ctx.Application["myip"];
                cartIp.Insert(isIp);
                ctx.Application["myip"] = cartIp;
                if (cartIp.GetCount(isIp) > rowCount)//超过了限制数量
                {
                    HttpContext.Current.Response.Write("<script>alert('留言失败');location='test.aspx'</script>");
                    HttpContext.Current.Response.End();
                }
            }
            else
            {
                CartIp cartIp = new CartIp();
                cartIp.Insert(isIp);
                HttpContext.Current.Application["myip"] = cartIp;
            }
        }

        private void Application_EndRequest(Object source, EventArgs e)
        {

        }

        public void Dispose()
        {

        }


    }
}

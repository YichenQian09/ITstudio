using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

public partial class EventAdd : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        if (Session["username"] == null)
        {
            Response.Write("<script>alert('尚未登录！');location='Login.aspx'</script>");
        }
        else if (!IsPostBack)
        {
            if (Request.Cookies["arr"] != null)
            {
                txtContent.Text = Server.UrlDecode(Request.Cookies["arr"]["content"]);
                txtTime.Value = Server.UrlDecode(Request.Cookies["arr"]["time"]);
               
                HttpCookie cookies = Request.Cookies["arr"];//删除cookies
                cookies.Expires = System.DateTime.Now.AddDays(-1);

                Response.Cookies.Add(cookies);
            }
            if (Request.Cookies["url"] != null)
            {
                img.ImageUrl = Request.Cookies["url"].Value;
                HttpCookie cookies1 = Request.Cookies["url"];//删除cookies
                cookies1.Expires = System.DateTime.Now.AddDays(-1);
                Response.Cookies.Add(cookies1);

            }

        }
    }
    

  
    protected void btnAdd_Click(object sender, EventArgs e)
    {
        string content = txtContent.Text.Trim();

        string time = txtTime.Value;

        string url = "";

        if (img.ImageUrl.Length > 0)
            url = img.ImageUrl;

        if (content.Length > 0 && time.Length > 0)
        {
            using (var db = new ITShowEntities())
            {
                Event person = new Event()
                {
                    EventContent = content,

                    EventImage = url,//图片是可有可无的

                    EventTime = time

                };
                db.Event.Add(person);
                if (db.SaveChanges() == 1)
                {
                    ClientScript.RegisterStartupScript(ClientScript.GetType(), "myscript", "<script >alert('添加成功');layer_close();</script>");
                }
                else
                    Response.Write("<script>alert('添加失败请重试')</script>");
            }
        }
        else
            Response.Write("<script>alert('不能为空')</script>");

    }

    protected void btnImage_Click(object sender, EventArgs e)
    {
        
        HttpCookie cookie = new HttpCookie("arr");
        cookie.Values["content"] = Server.UrlEncode(txtContent.Text.Trim());
        cookie.Values["time"] = Server.UrlEncode(txtTime.Value);
        cookie.Expires = System.DateTime.Now.AddMinutes(6);
        Response.Cookies.Add(cookie);
        Response.Write("<script>location='PhotoCut.aspx?type=3&&type1=0'</script>");

    }

    protected void dimg_Click(object sender, EventArgs e)
    {
        img.ImageUrl = "";
        img.Visible = false;
        dimg.Visible = false;
    }
}

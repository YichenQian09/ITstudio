using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Text.RegularExpressions;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

public partial class WorksAdd : System.Web.UI.Page
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
                txtTitle.Text = Server.UrlDecode(Request.Cookies["arr"]["title"]).ToString();
                txtLink.Text = Server.UrlDecode(Request.Cookies["arr"]["link"]).ToString();

                HttpCookie cookies = Request.Cookies["arr"];//删除cookies
                cookies.Expires = System.DateTime.Now.AddDays(-1);
                Response.Cookies.Add(cookies);
            }
            if (Request.Cookies["url"] != null)
            {
                img.Visible = true;
                img.ImageUrl = Request.Cookies["url"].Value;
                HttpCookie cookies1 = Request.Cookies["url"];//删除cookies
                cookies1.Expires = System.DateTime.Now.AddDays(-1);
                Response.Cookies.Add(cookies1);
            }
        }
    }

    protected void btnAdd_Click(object sender, EventArgs e)
    {
        string title = txtTitle.Text.Trim();

        string link = txtLink.Text.Trim();

        string Pattern = @"(http|https)://[^\s]*";

        Regex r = new Regex(Pattern);

        if (link.Length > 0  && title.Length > 0&&img.ImageUrl.Length>0)//都不能为空
        {
            if (r.IsMatch(link))
            {
                using (var db = new ITShowEntities())
                {
                    Works person = new Works()
                    {
                        WorksName = title,

                        WorksUrl = link,

                        WorksImage = img.ImageUrl
                    };

                    db.Works.Add(person);

                    if (db.SaveChanges() == 1)
                        ClientScript.RegisterStartupScript(ClientScript.GetType(), "myscript", "<script >alert('添加成功');layer_close();</script>");
                    else
                        Response.Write("<script>alert('添加失败请重试')</script>");
                }
            }
            else
                Response.Write("<script>alert('请输入有效URL,http/https格式')</script>");

        }
        else
            Response.Write("<script>alert('不能为空')</script>");
    }

    protected void btnImage_Click(object sender, EventArgs e)
    {
        HttpCookie cookie = new HttpCookie("arr");
        cookie.Values["title"] = Server.UrlEncode(txtTitle.Text.Trim());
        cookie.Values["link"] = Server.UrlEncode(txtLink.Text.Trim());
        cookie.Expires = System.DateTime.Now.AddMinutes(6);
        Response.Cookies.Add(cookie);

        Response.Write("<script>location='PhotoCut.aspx?type=2&&type1=0'</script>");
    }
}
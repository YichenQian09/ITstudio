using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Text.RegularExpressions;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

public partial class WorksEditor : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        if (Session["username"] == null)
        {
            Response.Write("<script>alert('尚未登录！');location='Login.aspx'</script>");
        }
        else
        {
            if (!IsPostBack)
            {
                Regex r = new Regex("^[1-9]d*|0$");

                if (Request.QueryString["id"] != null && r.IsMatch(Request.QueryString["id"]))
                {
                    int id = Convert.ToInt32(Request.QueryString["id"]);

                    using (var db = new ITShowEntities())
                    {
                        Works person = (from it in db.Works where it.WorksId == id select it).FirstOrDefault();

                        if (person != null)
                        {
                            txtTitle.Text = person.WorksName;

                            txtLink.Text = person.WorksUrl;

                            btnImage.ImageUrl = person.WorksImage.Trim();
                            if (Request.Cookies["arr"] != null)
                            {
                                txtTitle.Text = Server.UrlDecode(Request.Cookies["arr"]["title"]);
                                txtLink.Text = Server.UrlDecode(Request.Cookies["arr"]["link"]);

                                HttpCookie cookies = Request.Cookies["arr"];//删除cookies
                                cookies.Expires = System.DateTime.Now.AddDays(-1);
                                Response.Cookies.Add(cookies);
                            }
                            if (Request.Cookies["url"] != null)
                            {
                                btnImage.ImageUrl = Request.Cookies["url"].Value;
                                HttpCookie cookies1 = Request.Cookies["url"];//删除cookies
                                cookies1.Expires = System.DateTime.Now.AddDays(-1);
                                Response.Cookies.Add(cookies1);
                            }

                        }
                        else
                            Response.Write("<script>alert('地址栏有误');location='WorksList.aspx'</script>");
                    }

                }
                else
                    Response.Write("<script>alert('地址栏有误');location='WorksList.aspx'</script>");

            }
        }
    }

    protected void btnEditor_Click(object sender, EventArgs e)
    {
        int id = Convert.ToInt32(Request.QueryString["id"]);

        string title = txtTitle.Text.Trim();

        string link = txtLink.Text.Trim();

        string url = btnImage.ImageUrl.Trim();//图片

        string Pattern = @"(http|https)://[^\s]*";
        Regex r = new Regex(Pattern);

        if (title.Length > 0&& url.Length>0 && link.Length>0)
        {
            if (r.IsMatch(link))
            {
                using (var db = new ITShowEntities())//修改
                {
                    Works person = (from it in db.Works where it.WorksId == id select it).FirstOrDefault();

                    if (person.WorksName == title && person.WorksImage == btnImage.ImageUrl && person.WorksUrl == link)
                        Response.Write("<script>alert('未修改');location='WorksList.aspx'</script>");
                    else
                    {
                        person.WorksName = title;
                        person.WorksUrl = link;
                        person.WorksImage = url;
                        if (db.SaveChanges() == 1)
                            Response.Write("<script>alert('编辑成功');location='WorksList.aspx'</script>");
                        else
                            Response.Write("<script>alert('编辑失败请重试')</script>");
                    }
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
        int id = Convert.ToInt32( Request.QueryString["id"]);
        HttpCookie cookie = new HttpCookie("arr");
        cookie.Values["title"] = Server.UrlEncode(txtTitle.Text.Trim());
        cookie.Values["link"] = Server.UrlEncode(txtLink.Text.Trim());
        cookie.Expires = System.DateTime.Now.AddMinutes(6);
        Response.Cookies.Add(cookie);

        Response.Write("<script>location='PhotoCut.aspx?type=2&&type1=1&&id="+id+"'</script>");
    }
}
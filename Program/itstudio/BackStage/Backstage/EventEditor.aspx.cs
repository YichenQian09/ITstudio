using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Text.RegularExpressions;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

public partial class EventEditor : System.Web.UI.Page
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
                        Event person = (from it in db.Event where it.EventId == id select it).FirstOrDefault();

                        if (person != null)
                        {
                            txtContent.Text = person.EventContent;

                            txtTime.Value = person.EventTime;

                            img.ImageUrl = person.EventImage;

                            if (img.ImageUrl.Length > 0)
                            {
                                img.Visible = true;

                                dimg.Visible = true;
                            }

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
                                img.Visible = true;
                                dimg.Visible = true;
                                img.ImageUrl = Request.Cookies["url"].Value;
                                HttpCookie cookies1 = Request.Cookies["url"];//删除cookies
                                cookies1.Expires = System.DateTime.Now.AddDays(-1);
                                Response.Cookies.Add(cookies1);

                            }



                        }

                    }
                }
                else
                    Response.Write("<script>alert('地址栏有误');location='EventList.aspx'</script>");

            }
        }
    }

    protected void btnEditor_Click(object sender, EventArgs e)
    {
        int id = Convert.ToInt32(Request.QueryString["id"]);
        string content = txtContent.Text.Trim();
        string time = txtTime.Value;

        string url = "";
        if(img.ImageUrl.Length>0)
            url= img.ImageUrl;//图片地址

        if (content.Length > 0 && txtTime.Value.Length > 0 )
        {

            using (var db = new ITShowEntities())
            {
                Event person = (from it in db.Event where it.EventId == id select it).FirstOrDefault();

                if (person.EventTime == time && person.EventContent == content&&person.EventImage==img.ImageUrl)//如果没修改
                    Response.Write("<script>alert('未修改');location='EventList.aspx'</script>");
                else
                {
                    person.EventContent = content;
                    person.EventTime = time;
                    person.EventImage = url;
                    if (db.SaveChanges() == 1)
                        Response.Write("<script>alert('编辑成功');location='EventList.aspx'</script>");
                    else
                        Response.Write("<script>alert('编辑失败请重试')</script>");
                }
            }
        }
        else
            Response.Write("<script>alert('不能为空')</script>");
    }

    protected void dimg_Click(object sender, EventArgs e)
    {
        dimg.Visible = false;//隐藏删除照片的按钮
        img.Visible = false;//隐藏照片
        img.ImageUrl = "";//把图片地址置为0
    }


    protected void btnImage_Click(object sender, EventArgs e)
    {
        int id = Convert.ToInt32(Request.QueryString["id"]);
        HttpCookie cookie = new HttpCookie("arr");
        cookie.Values["content"] = Server.UrlEncode(txtContent.Text.Trim());
        cookie.Values["time"] = Server.UrlEncode(txtTime.Value);
        cookie.Expires = System.DateTime.Now.AddMinutes(6);
        Response.Cookies.Add(cookie);
        Response.Write("<script>location='PhotoCut.aspx?type=3&&type1=1&&id=" + id + "'</script>");
    }
}
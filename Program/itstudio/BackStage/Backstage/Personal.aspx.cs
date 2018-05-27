using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

public partial class BackStage_Backstage_Personal : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        if (Session["username"] == null)
        {
            Response.Write("<script>alert('尚未登陆！');window.location='Login.aspx'</script>");
        }
        else
        {
            if (!IsPostBack)
            {
                try
                {
                    string username = Request.QueryString["username"];

                    using (var db = new ITShowEntities())
                    {
                        Admin admin = db.Admin.SingleOrDefault(a => a.AdminName == username);

                        txtemail.Text = admin.AdminEmail;

                        btnImage.ImageUrl = admin.AdminImage.Trim();

                        if (Request.Cookies["url"] != null)
                        {
                            btnImage.ImageUrl = Request.Cookies["url"].Value;
                            HttpCookie cookies1 = Request.Cookies["url"];//删除cookies
                            cookies1.Expires = System.DateTime.Now.AddDays(-1);
                            Response.Cookies.Add(cookies1);
                        }
                    }
                }
                catch
                {
                    Response.Write("<script>alert('地址栏错误');window.parent.location='index.aspx'</script>");

                }
            }
        }
    }

    protected void btnsure_Click(object sender, EventArgs e)
    {
        string username = Request.QueryString["username"];

        string url = btnImage.ImageUrl.Trim();

        using (var db = new ITShowEntities())
        {
            Admin admin = db.Admin.SingleOrDefault(a => a.AdminName == username);

            admin.AdminEmail = txtemail.Text;
            //以下写存照片的路径
            admin.AdminImage = url;

            if (db.SaveChanges() == 1)
                Response.Write("<script>alert('修改成功')</script>");
            else
                Response.Write("<script>alert('修改失败请重试')</script>");

        }
    }

    protected void btnchangepassword_Click(object sender, EventArgs e)
    {
        passvword1.Visible = true;
        div1.Visible = false;
    }

    protected void btnpassword_Click(object sender, EventArgs e)
    {
        string username = Request.QueryString["username"];
        if (RequiredFieldValidator2.IsValid == true && CompareValidator1.IsValid == true)
        {
            if (txtPwd.Text.Length >= 8)
            {
                string pwd = Class1.md5(txtPwd.Text, 32);

                using (var db = new ITShowEntities())
                {
                    Admin admin = db.Admin.SingleOrDefault(a => a.AdminName == username);

                    admin.AdminPassword = pwd;

                    if (db.SaveChanges() == 1)
                        Response.Write("<script>alert('修改成功')</script>");
                    else
                        Response.Write("<script>alert('修改失败请重试')</script>");
                }
            }
            else
            {
                Response.Write("<script>alert('密码长度不够！')</script>");
            }
        }
    }

    protected void Button1_Click(object sender, EventArgs e)
    {
        div1.Visible = true;
        passvword1.Visible = false;
    }

    protected void btnImage_Click(object sender, ImageClickEventArgs e)
    {
        string username = Request.QueryString["username"];

        Response.Write("<script>location='PhotoCut.aspx?type=4&&type1=0&&username=" + username + "'</script>");

    }
}
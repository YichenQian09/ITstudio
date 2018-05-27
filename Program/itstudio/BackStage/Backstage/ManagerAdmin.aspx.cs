using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.RegularExpressions;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

public partial class BackStage_Backstage_ManagerAdmin : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        if (Session["username"] == null)
        {
            Response.Write("<script>alert('尚未登陆');location='index.aspx'</script>");
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
                        Admin admin = db.Admin.SingleOrDefault(a => a.AdminId == id);

                        if (admin != null)
                        {
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
                }
                else
                {
                    Response.Write("<script>alert('地址栏错误');location='index.aspx'</script>");
                }
            }
        }
    }

    protected void email_Click(object sender, EventArgs e)
    {
        email1.Visible = true;
        password1.Visible = false;
        photo1.Visible = false;
    }

    protected void btnpassword_Click(object sender, EventArgs e)
    {
        int id = Convert.ToInt32(Request.QueryString["id"]);

        if (RequiredFieldValidator2.IsValid == true && CompareValidator1.IsValid == true)
        {
            if (txtPwd.Text.Length >= 8)
            {
                string pwd = Class1.md5(txtPwd.Text, 32);

                using (var db = new ITShowEntities())
                {
                    Admin admin = db.Admin.SingleOrDefault(a => a.AdminId == id);

                    if (pwd == admin.AdminPassword.Trim())
                    {
                        Response.Write("<script>alert('密码相同')</script>");
                    }
                    else
                    {
                        admin.AdminPassword = pwd;
                        if (db.SaveChanges() == 1)
                        {

                            Response.Write("<script>alert('修改成功')</script>");
                        }
                        else

                            Response.Write("<script>alert('修改失败请重试')</script>");
                    }
                }
            }
            else
            {
                Response.Write("<script>alert('密码长度不够！')</script>");
            }
        }
    }

   
    protected void btnemail_Click(object sender, EventArgs e)
    {
        int id = Convert.ToInt32(Request.QueryString["id"]);

        string email = txtemail.Text;

        using (var db = new ITShowEntities())
        {
            Admin admin = db.Admin.SingleOrDefault(a => a.AdminId == id);

            if (email == admin.AdminEmail)
            {
                Response.Write("<script>alert('邮箱相同')</script>");
            }
            else
            {
                admin.AdminEmail = email;
                if (db.SaveChanges() == 1)
                {
                    Response.Write("<script>alert('修改成功')</script>");
                }
                else
                    Response.Write("<script>alert('修改失败请重试')</script>");
            }
        }
    }


    protected void password_Click(object sender, EventArgs e)
    {
        email1.Visible = false;
        password1.Visible = true;
        photo1.Visible = false;
    }

    protected void changePhoto_Click(object sender, EventArgs e)
    {
        email1.Visible = false;
        password1.Visible = false;
        photo1.Visible = true;
    }



    protected void btnImage_Click(object sender, ImageClickEventArgs e)
    {
        int id = Convert.ToInt32(Request.QueryString["id"]);
        Response.Write("<script>location='PhotoCut.aspx?type=4&&type1=1&&id="+id+"'</script>");
    }

    protected void editorImage_Click(object sender, EventArgs e)
    {
        int id = Convert.ToInt32(Request.QueryString["id"]);

        string url = btnImage.ImageUrl.Trim();

        using (var db=new ITShowEntities())
        {
            Admin person = (from it in db.Admin where it.AdminId == id select it).FirstOrDefault();

            person.AdminImage = url;

            if(db.SaveChanges()==1)
                Response.Write("<script>alert('修改成功')</script>");
            else
                Response.Write("<script>alert('修改失败请重试')</script>");

        }
    }
}
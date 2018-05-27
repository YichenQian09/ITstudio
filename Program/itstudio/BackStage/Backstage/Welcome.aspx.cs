using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

public partial class BackStage_Backstage_Welcome : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        if(Session["username"]==null)
        {
            Response.Write("<script>alert('尚未登录！');location='Login.aspx'</script>");
        }
        else
        {
            using (var db=new ITShowEntities())
            {
                string username = Session["username"].ToString();
                Admin admin = (from it in db.Admin where it.AdminName == username select it).FirstOrDefault();

                img.ImageUrl = admin.AdminImage.Trim();

                if (admin.Flag==false)
                {
                    lbemail.Visible = true;
                }
                else
                {
                    lbemail.Visible = false;
                }
            }
        }
    }

    protected void lbemail_Click(object sender, EventArgs e)
    {
        Random ran = new Random();

        int number = ran.Next(1000, 9999);

        Session["number"] = number;

        using (var db = new ITShowEntities())

        {
            string username = Session["username"].ToString();
            Admin admin = (from it in db.Admin where it.AdminName == username select it).FirstOrDefault();

            try
            {
                Library.DAL.Send.Sendemails("17806282596@163.com", admin.AdminEmail, "验证邮箱", "邮箱验证码为'" + number + "'");

                divemail.Visible = true;

                Response.Write("<script>alert('验证码发送成功！')</script>");

            }
            catch (Exception ex)
            {
                Response.Write("<script>alert('未联网');location='Login.aspx'</script>");
            }
        }
    }

    protected void btnemail_Click(object sender, EventArgs e)
    {

        if (Convert.ToInt32(Session["number"].ToString()) == Convert.ToInt32(txtemail.Text))
        {
            using (var db = new ITShowEntities())

            {
                string username = Session["username"].ToString();

                Admin admin = (from it in db.Admin where it.AdminName == username select it).FirstOrDefault();

                admin.Flag = true;

                db.SaveChanges();

                divemail.Visible = false;

                Response.Write("<script>alert('验证成功！');location='Welcome.aspx'</script>");
            }
        }
        else
        {
            Response.Write("<script>alert('验证码错误！')</script>");
        }
    }
}
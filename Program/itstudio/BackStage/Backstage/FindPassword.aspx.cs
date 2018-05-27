using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

public partial class BackStage_Backstage_FindPassword : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {

    }
    protected void BtnFound_Click(object sender, EventArgs e)
    {
        string username = txtName.Text;

        Session["name2"] = username;

        string email = txtPho.Text;

        using (var db = new ITShowEntities())
        {
            Admin admin = db.Admin.SingleOrDefault(a => a.AdminName == txtName.Text && a.AdminEmail == txtPho.Text);

            try
            {
                if (admin != null)
                {
                    if (admin.Flag == true)
                    {
                        divfoundback1.Visible = false;
                        divfoundback5.Visible = true;
                    }
                    else
                    {
                        Response.Write("<script>alert('该邮箱尚未验证！')</script>");
                    }
                }
                else
                    Response.Write("<script>alert('用户名或邮箱错误！')</script>");

            }
            catch (Exception ex)
            {
                Response.Write(ex);

            }
        }
    }

    protected void Question(object sender, EventArgs e)
    {
        divfoundback1.Visible = false;

        divfoundback2.Visible = true;

    }
    protected void BtnFound_Click2(object sender, EventArgs e)
    {
        Random ran = new Random();

        int id = ran.Next(0, 3);

        string name = username.Text;

        Session["name2"] = name;
        using (var db = new ITShowEntities())
        {
            Admin admin = db.Admin.SingleOrDefault(a => a.AdminName == name);

            if (admin != null)
            {
                var question = from it in db.Question where it.AdminId == admin.AdminId select it;

                List<Question> dt = question.ToList();

                question1.Text = dt[id].Question1;

                Session["answer"] = dt[id].Answer;

                divfoundback2.Visible = false;

                divfoundback3.Visible = true;

            }
            else
                Response.Write("<script>alert('用户名不正确!')</script>");
        }
    }
    protected void BtnFound_Click3(object sender, EventArgs e)
    {
        if (answer.Text == Session["answer"].ToString())
        {
            divfoundback3.Visible = false;
            divfoundback4.Visible = true;
        }
        else
            Response.Write("<script>alert('答案错误！')</script>");
    }

    protected void btnnewpwd_Click(object sender, EventArgs e)
    {
        if (RequiredFieldValidator1.IsValid == true && RequiredFieldValidator2.IsValid == true && CompareValidator1.IsValid == true)
        {
            string username = Session["name2"].ToString();

            string EnPswdStr = Class1.md5(txtPwd.Text, 32);

            string password = EnPswdStr;

            using (var db = new ITShowEntities())
            {
                Admin admin = db.Admin.SingleOrDefault(a => a.AdminName == username);

                admin.AdminPassword = password;

                db.SaveChanges();

                Response.Write("<script>alert('修改成功！');location='Login.aspx'</script>");
            }
        }
    }

    protected void btnGetNumber_Click(object sender, EventArgs e)
    {
        Random rd = new Random();

        int number = rd.Next(1000, 10000);

        Session["number"] = number;

        Session["time"] = DateTime.Now.ToString();

        using (var db = new ITShowEntities())
        {
            string username = Session["name2"].ToString();

            Admin admin = db.Admin.SingleOrDefault(a => a.AdminName == username);
            try
            {
                Library.DAL.Send.Sendemails("17806282596@163.com", admin.AdminEmail, "修改密码", "本次操作验证码为'" + number + "'请在20分钟内完成验证！");

            }
            catch (Exception ex)
            {
                Response.Write("<script>alert('未联网');location='Login.aspx'</script>");
            }
        }
    }

    protected void btnSure_Click(object sender, EventArgs e)
    {
        DateTime agoTime = Convert.ToDateTime(Session["time"]);

        DateTime nowTime = DateTime.Now;

        if (agoTime.AddMinutes(30) < nowTime)
        {
            Response.Write("<script>alert('超过验证码有效时间')</script>");
        }
        else
        {
            if (txtNumber.Text == Session["number"].ToString())
            {
                divfoundback5.Visible = false;

                divfoundback4.Visible = true;
            }
            else
            {
                Response.Write("<script>alert('验证码错误！')</script>");
            }
        }
    }
}
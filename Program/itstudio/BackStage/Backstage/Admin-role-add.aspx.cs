using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

public partial class BackStage_Backstage_Admin_role_add : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        if (Session["username"] == null)
        {
            Response.Write("<script>alert('尚未登录！');location='Login.aspx'</script>");
        }
        else
        {
            using (var db = new ITShowEntities())
            {
                string username = Session["username"].ToString();

                Admin admin = db.Admin.SingleOrDefault(a => a.AdminName == username);
                if (admin.AdminId != 3)
                {
                    Response.Write("<script>alert('你没有权限使用此功能！');location='Admin-role.aspx'</script>");
                }
            }
        }

    }
    protected void BtnRegister_Click(object sender, EventArgs e)
    {
        Class1 register = new Class1();

        string question1 = DropDownList.SelectedValue;

        string answer1 = txtanswer.Text;

        string question2 = DropDownList1.Text;

        string answer2 = txtanswer1.Text;

        string question3 = DropDownList2.Text;

        string answer3 = txtanswer2.Text;

        if ((((((CompareValidator1.IsValid == true && RequiredFieldValidator2.IsValid == true) && RequiredFieldValidator3.IsValid == true) && RequiredFieldValidator5.IsValid == true) && RequiredFieldValidator6.IsValid == true) && RequiredFieldValidator7.IsValid == true) && RequiredFieldValidator9.IsValid == true)
        {
            if (txtPwd.Text.IndexOf(" ") >= 0)
            {
                Response.Write("<script>alert('密码请不要输入空格！')</script>");
            }
            else
            {
                if (txtPwd.Text.Length >= 8)
                {
                    if (question1 == question2 || question2 == question3 || question3 == question1)
                    {
                        Response.Write("<script>alert('问题不能选择一样！')</script>");
                    }
                    else
                    {

                        using (var db = new ITShowEntities())
                        {
                            Admin admin = new Admin();

                            Admin ad = db.Admin.SingleOrDefault(a => a.AdminName == txtusername.Text);

                            if (ad == null)
                            {
                                admin.AdminName = txtusername.Text;

                                admin.AdminPassword = Class1.md5(txtPwd.Text, 32);

                                admin.AdminEmail = txtmailbox.Text;

                                admin.AdminImage = "Images / t011ea4d03abdd5760e.jpg";

                                db.Admin.Add(admin);

                                db.SaveChanges();

                                Admin ad1 = db.Admin.SingleOrDefault(a => a.AdminName == txtusername.Text);

                                int id = ad1.AdminId;

                                Question thisquestion1 = new Question();
                                Question thisquestion2 = new Question();
                                Question thisquestion3 = new Question();

                                thisquestion1.AdminId = id;
                                thisquestion2.AdminId = id;
                                thisquestion3.AdminId = id;

                                thisquestion1.Question1 = question1;
                                thisquestion2.Question1 = question2;
                                thisquestion3.Question1 = question3;

                                thisquestion1.Answer = answer1;
                                db.Question.Add(thisquestion1);
                                thisquestion2.Answer = answer2;
                                db.Question.Add(thisquestion2);
                                thisquestion3.Answer = answer3;
                                db.Question.Add(thisquestion3);

                                db.SaveChanges();
                                Response.Write("<script>alert('注册成功！')</script>");
                            }
                            else
                            {
                                Response.Write("<script>alert('用户名已经存在！')</script>");
                            }

                        }
                    }
                }
                else
                {
                    Response.Write("<script>alert('密码长度不够！')</script>");
                }
            }
        }
    }
}
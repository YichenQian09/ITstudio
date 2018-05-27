using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

public partial class ApplicationFormMobile : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {

    }

    protected void btnSubmit_Click(object sender, EventArgs e)
    {
        if (txtGradeMajor.Value.Length > 0 && txtQQ.Value.Length > 0 && txtName.Value.Length > 0 && txtTel.Value.Length > 0 && Request.Form["txtIntroduction"].Length > 0 && txtDepart.Value.Length > 0)
        {
            string name = txtName.Value;
            string tel = txtTel.Value;
            string gradeMajor = txtGradeMajor.Value;
            string introduction = Request.Form["txtIntroduction"];
            int depart = Convert.ToInt32(txtDepart.Value);
            IPManager manager = new IPManager();//查看IP是否用得频繁
            string IPAddress = manager.GetClientIPv4Address();
            XmlManager xmanager = new XmlManager();
            int ans = xmanager.Editor(IPAddress);
            if (ans > 0)//能否写入IP
            {
                if (ans == 1)//该IP十秒内无操作
                {
                    xmanager.Add(IPAddress);//如果没有这个IP，就加入记录
                    using (var db = new ITShowEntities())
                    {
                        Application person = new Application();
                        person.Name = name;
                        person.GradeMajor = gradeMajor;
                        person.Telephone = tel;
                        person.Introdution = introduction;
                        person.Time = Convert.ToDateTime(DateTime.Now.ToString());
                        person.QQ = txtQQ.Value;
                        switch (depart)
                        {
                            case 1: person.Department = "前端开发"; break;
                            case 2: person.Department = "程序开发"; break;
                            case 3: person.Department = "UI设计"; break;
                            case 4: person.Department = "APP开发"; break;
                        }
                        db.Application.Add(person);

                        if (db.SaveChanges() == 1)
                            Response.Write("<script>alert('报名成功，欢迎加入爱特交流群，群号:245775349');location='ApplicationFormMobile.aspx'</script>");
                        else
                            Response.Write("<script>alert('报名失败请重试');location='ApplicationFormMobile.aspx'</script>");
                    }
                }
                else
                    Response.Write("<script>alert('操作过于频繁请10秒后再操作');location='ApplicationFormMobile.aspx'</script>");
            }
            else
                Response.Write("<script>alert('操作失败请重试');location='ApplicationFormMobile.aspx'</script>");

        }
    }
}
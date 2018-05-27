using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

public partial class MemberList : System.Web.UI.Page
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
                if (Session["Mds"] != null)
                {
                    year.SelectedValue = Server.UrlDecode(Request.Cookies["year"]["year"]);
                    if (Session["page"] != null)
                        DataBindToRepeater(Convert.ToInt32(Session["page"]));
                    else
                        DataBindToRepeater(1);
                }
                else
                {
                    using (var db = new ITShowEntities())
                    {
                        var person = (from it in db.Member select it);

                        lbcount.Text = person.ToList().Count.ToString();//找出所有的成员的人数

                        var person1 = from it in db.Member where it.MemberYear == "2016" select it;

                         Session["Mds"] = person1.ToList();
                        HttpCookie cookie = new HttpCookie("year");
                        cookie.Values["year"] = "2016";
                        cookie.Expires = System.DateTime.Now.AddMinutes(6);
                        Response.Cookies.Add(cookie);
                        lbcount1.Text = person1.ToList().Count.ToString();//每届的人员的人数
                    }

                    DataBindToRepeater(1);//显示16届成员
                }
                
            }

        }
    }
    private void DataBindToRepeater(int currentPage)
    {
        Session["page"] = currentPage;

        PagedDataSource pds = new PagedDataSource();

        pds.AllowPaging = true;

        pds.PageSize = 5;

        List<Member> person = (List<Member>) Session["Mds"];

        pds.DataSource = person;

        lbcount1.Text = person.ToList().Count.ToString();//每届的人员的人数

        lbTotal.Text = pds.PageCount.ToString();

        pds.CurrentPageIndex = currentPage - 1;

        rpt.DataSource = pds;

        rpt.DataBind();


    }

    protected void year_SelectedIndexChanged(object sender, EventArgs e)
    {
        string year1 = year.SelectedValue;

        using (var db = new ITShowEntities())
        {
            var person = (from it in db.Member select it);

            lbcount.Text = person.ToList().Count.ToString();//找出所有的成员的人数

            var person1 = from it in db.Member where it.MemberYear == year1 select it;

             Session["Mds"] = person1.ToList();

            HttpCookie cookie = new HttpCookie("year");
            cookie.Values["year"] = year1;
            cookie.Expires = System.DateTime.Now.AddMinutes(6);
            Response.Cookies.Add(cookie);

            lbcount1.Text = person1.ToList().Count.ToString();
        }

        DataBindToRepeater(1);

    }

    protected void rpt_ItemCommand(object source, RepeaterCommandEventArgs e)
    {
        if (e.CommandName == "delete")
        {
            int id = Convert.ToInt32(e.CommandArgument);
            using(var db =new ITShowEntities())
            {
                Member person = (from it in db.Member where it.MemberId == id select it).FirstOrDefault();

                db.Member.Remove(person);

                if (db.SaveChanges() == 1)
                    Response.Write("<script>alert('删除成功');location='MemberList.aspx'</script>");
                else
                    Response.Write("<script>alert('删除失败请重试');location='MemberList.aspx'</script>");
            }
        }
    }
    protected void btnUp_Click(object sender, EventArgs e)
    {

        if (Convert.ToInt32(lbNow.Text) - 1 < 1)
            lbNow.Text = "1";

        else
            lbNow.Text = Convert.ToString(Convert.ToInt32(lbNow.Text) - 1);

        DataBindToRepeater(Convert.ToInt32(lbNow.Text));

    }

    protected void btnDown_Click(object sender, EventArgs e)
    {

        if (Convert.ToInt32(lbNow.Text) + 1 <= Convert.ToInt32(lbTotal.Text))
            lbNow.Text = Convert.ToString(Convert.ToInt32(lbNow.Text) + 1);

        DataBindToRepeater(Convert.ToInt32(lbNow.Text));
    }

    protected void btnFirst_Click(object sender, EventArgs e)
    {

        lbNow.Text = "1";

        DataBindToRepeater(Convert.ToInt32(lbNow.Text));
    }

    protected void btnLast_Click(object sender, EventArgs e)
    {

        lbNow.Text = Convert.ToString(Convert.ToInt32(lbTotal.Text));

        DataBindToRepeater(Convert.ToInt32(lbNow.Text));
    }

    protected void btnJump_Click(object sender, EventArgs e)
    {

        int i = 0;

        if (int.TryParse(txtJump.Text, out i))
        {
            if (Convert.ToInt32(txtJump.Text) < 1 || Convert.ToInt32(txtJump.Text) > Convert.ToInt32(lbTotal.Text))
                txtJump.Text = Convert.ToString(Convert.ToInt32(lbNow.Text));

            else
                lbNow.Text = Convert.ToString(Convert.ToInt32(txtJump.Text));
        }

        else
            txtJump.Text = Convert.ToString(Convert.ToInt32(lbNow.Text));

        DataBindToRepeater(Convert.ToInt32(lbNow.Text));
    }
}
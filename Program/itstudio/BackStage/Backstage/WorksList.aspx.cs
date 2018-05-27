using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

public partial class WorksList : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        Session["url"] = null;
        Session["arr"] = null;//清空储存编辑信息session
        if (Session["username"] == null)
        {
            Response.Write("<script>alert('尚未登录！');location='Login.aspx'</script>");
        }
        else
        {
            if (!IsPostBack)
            {
                using (var db = new ITShowEntities())
                {
                    var person = (from it in db.Works select it);

                    Session["ds"] = person.ToList();

                    lbcount.Text = person.ToList().Count.ToString();

                    DataBindToRepeater(1, (List<Works>)Session["ds"]);
                }
            }
        }
    }
    private void DataBindToRepeater(int currentPage, List<Works> datascore)
    {

        PagedDataSource pds = new PagedDataSource();

        pds.AllowPaging = true;

        pds.PageSize = 5;

        pds.DataSource = datascore;

        lbTotal.Text = pds.PageCount.ToString();

        pds.CurrentPageIndex = currentPage - 1;

        rpt.DataSource = pds;

        rpt.DataBind();

    }


    protected void rpt_ItemCommand(object source, RepeaterCommandEventArgs e)
    {
        if (e.CommandName == "delete")
        {
            int id = Convert.ToInt32(e.CommandArgument);
            using (var db = new ITShowEntities())
            {
                Works person = (from it in db.Works where it.WorksId == id select it).FirstOrDefault();

                db.Works.Remove(person);

                if (db.SaveChanges() == 1)
                    Response.Write("<script>alert('删除成功');location='WorksList.aspx'</script>");
                else
                    Response.Write("<script>alert('删除失败请重试');location='WorksList.aspx'</script>");
            }
        }
        //if (e.CommandName == "URL")
        //{
        //    //string url = Server.UrlEncode (e.CommandArgument.ToString().Trim());
        //    string url = e.CommandArgument.ToString().Trim();
        //    Response.Write("<script>window.open('http://www.baidu.com','_blank')</script>");
        //}
    }

    protected void btnUp_Click(object sender, EventArgs e)
    {

        if (Convert.ToInt32(lbNow.Text) - 1 < 1)
            lbNow.Text = "1";

        else
            lbNow.Text = Convert.ToString(Convert.ToInt32(lbNow.Text) - 1);

        DataBindToRepeater(Convert.ToInt32(lbNow.Text), (List<Works>)Session["ds"]);
    }

    protected void btnDown_Click(object sender, EventArgs e)
    {

        if (Convert.ToInt32(lbNow.Text) + 1 <= Convert.ToInt32(lbTotal.Text))
            lbNow.Text = Convert.ToString(Convert.ToInt32(lbNow.Text) + 1);

        DataBindToRepeater(Convert.ToInt32(lbNow.Text), (List<Works>)Session["ds"]);
    }

    protected void btnFirst_Click(object sender, EventArgs e)
    {

        lbNow.Text = "1";

        DataBindToRepeater(Convert.ToInt32(lbNow.Text), (List<Works>)Session["ds"]);
    }

    protected void btnLast_Click(object sender, EventArgs e)
    {

        lbNow.Text = Convert.ToString(Convert.ToInt32(lbTotal.Text));

        DataBindToRepeater(Convert.ToInt32(lbNow.Text), (List<Works>)Session["ds"]);
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

        DataBindToRepeater(Convert.ToInt32(lbNow.Text), (List<Works>)Session["ds"]);
    }
}
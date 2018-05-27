using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

public partial class BackStage_Backstage_Comment_list : System.Web.UI.Page
{
    protected int CommentCount;
    protected void Page_Load(object sender, EventArgs e)
    {
        if (Session["username"] == null)
        {
            Response.Write("<script>alert('尚未登录！');location='Login.aspx'</script>");
        }
        else
        {
            if (Session["list"] == null)
            {
                ReturnList();
            }
            if (!IsPostBack)
            {
                ReturnList();
                RptDataBind(1, (List<Message>)Session["list"]);
            }
        }
    }
    protected void ReturnList()
    {
        using (var db = new ITShowEntities())
        {
            var datascore = from it in db.Message orderby it.MessageTime descending select it;
            Session["list"] = datascore.ToList();
        }
    }
    protected void RptDataBind(int currentPage ,List<Message>message)
    {
        PagedDataSource pds = new PagedDataSource();

        pds.AllowPaging = true;

        pds.PageSize = 5;

        pds.DataSource = message;

        CommentCount = message.Count();

        lbTotal.Text = pds.PageCount.ToString();

        pds.CurrentPageIndex = currentPage - 1;//当前页数从零开始，故把接受的数减一

        rptComment.DataSource = pds;

        rptComment.DataBind();

    }

    protected void rptComment_ItemCommand(object source, RepeaterCommandEventArgs e)
    {
        if (e.CommandName == "Delete")
        {
            int idComment = Convert.ToInt32(e.CommandArgument);
            using (var db= new ITShowEntities())
            {
                Message message = db.Message.SingleOrDefault(a => a.MessageId == idComment);
                db.Message.Remove(message);
                db.SaveChanges();
            }
            Response.Write("<script>window.location='Comment-list.aspx'</script>");
        }
    }

    protected void btnSelect_Click(object sender, EventArgs e)
    {
        if (txtKeyComment.Text != "")
        {
            if (datemin.Value == "" && datemax.Value == "")
            {
                using (var db = new ITShowEntities())
                {

                    //查询含有某个字符的留言
                    var select = from it in db.Message where (it.MessageContent.Contains(txtKeyComment.Text)) select it;

                    PagedDataSource pds = new PagedDataSource();

                    pds.AllowPaging = true;

                    pds.PageSize = 5;

                    pds.DataSource = select.ToList();

                    CommentCount = select.Count();

                    lbTotal.Text = pds.PageCount.ToString();

                    CommentCount = select.Count();

                    Session["list"] = select.ToList();

                    rptComment.DataSource = select.ToList();

                    rptComment.DataBind();
                }
            }
            if (datemin.Value != "" && datemax.Value == "")
            {
                //开始时间

                DateTime mindate = Convert.ToDateTime(datemin.Value);

                using (var db = new ITShowEntities())
                {

                    var select = from it in db.Message where (it.MessageContent.Contains(txtKeyComment.Text) && it.MessageTime > mindate) select it;

                    PagedDataSource pds = new PagedDataSource();

                    pds.AllowPaging = true;

                    pds.PageSize = 5;

                    pds.DataSource = select.ToList();

                    CommentCount = select.Count();

                    lbTotal.Text = pds.PageCount.ToString();

                    CommentCount = select.Count();

                    Session["list"] = select.ToList();

                    rptComment.DataSource = select.ToList();

                    rptComment.DataBind();
                }
            }
            if (datemin.Value == "" && datemax.Value != "")
            {
                //终止时间
                DateTime maxdate = Convert.ToDateTime(datemax.Value);
                using (var db = new ITShowEntities())
                {

                    var select = from it in db.Message where (it.MessageContent.Contains(txtKeyComment.Text) && it.MessageTime < maxdate) select it;

                    PagedDataSource pds = new PagedDataSource();

                    pds.AllowPaging = true;

                    pds.PageSize = 5;

                    pds.DataSource = select.ToList();

                    CommentCount = select.Count();

                    lbTotal.Text = pds.PageCount.ToString();

                    CommentCount = select.Count();

                    Session["list"] = select.ToList();

                    rptComment.DataSource = select.ToList();

                    rptComment.DataBind();
                }
            }
            if (datemin.Value != "" && datemax.Value != "")
            {
                //开始时间

                DateTime mindate = Convert.ToDateTime(datemin.Value);
                //终止时间
                DateTime maxdate = Convert.ToDateTime(datemax.Value);
                using (var db = new ITShowEntities())
                {
                    var select = from it in db.Message where (it.MessageContent.Contains(txtKeyComment.Text) && it.MessageTime < maxdate && it.MessageTime > mindate) select it;

                    PagedDataSource pds = new PagedDataSource();

                    pds.AllowPaging = true;

                    pds.PageSize = 5;

                    pds.DataSource = select.ToList();

                    CommentCount = select.Count();

                    lbTotal.Text = pds.PageCount.ToString();

                    CommentCount = select.Count();

                    Session["list"] = select.ToList();

                    rptComment.DataSource = select.ToList();

                    rptComment.DataBind();
                }
            }
        }
        else
        {
            if (datemin.Value == "" && datemax.Value == "")
            {
                ReturnList();

                RptDataBind(1, (List<Message>)Session["list"]);
            }
            if (datemin.Value != "" && datemax.Value == "")
            {
                //开始时间

                DateTime mindate = Convert.ToDateTime(datemin.Value);
                using (var db = new ITShowEntities())
                {

                    var select = from it in db.Message where (it.MessageTime > mindate) select it;

                    PagedDataSource pds = new PagedDataSource();

                    pds.AllowPaging = true;

                    pds.PageSize = 5;

                    pds.DataSource = select.ToList();

                    CommentCount = select.Count();

                    lbTotal.Text = pds.PageCount.ToString();

                    CommentCount = select.Count();

                    Session["list"] = select.ToList();

                    rptComment.DataSource = select.ToList();

                    rptComment.DataBind();
                }
            }
            if (datemin.Value == "" && datemax.Value != "")
            {
                //终止时间
                DateTime maxdate = Convert.ToDateTime(datemax.Value);
                using (var db = new ITShowEntities())
                {

                    var select = from it in db.Message where (it.MessageTime < maxdate) select it;

                    PagedDataSource pds = new PagedDataSource();

                    pds.AllowPaging = true;

                    pds.PageSize = 5;

                    pds.DataSource = select.ToList();

                    CommentCount = select.Count();

                    lbTotal.Text = pds.PageCount.ToString();

                    CommentCount = select.Count();

                    Session["list"] = select.ToList();

                    rptComment.DataSource = select.ToList();

                    rptComment.DataBind();
                }
            }
            if (datemin.Value != "" && datemax.Value != "")
            {
                //开始时间

                DateTime mindate = Convert.ToDateTime(datemin.Value);
                //终止时间
                DateTime maxdate = Convert.ToDateTime(datemax.Value);
                using (var db = new ITShowEntities())
                {
                    var select = from it in db.Message where (it.MessageTime < maxdate && it.MessageTime > mindate) select it;

                    PagedDataSource pds = new PagedDataSource();

                    pds.AllowPaging = true;

                    pds.PageSize = 5;

                    pds.DataSource = select.ToList();

                    CommentCount = select.Count();

                    lbTotal.Text = pds.PageCount.ToString();

                    CommentCount = select.Count();

                    Session["list"] = select.ToList();

                    rptComment.DataSource = select.ToList();

                    rptComment.DataBind();
                }
            }
        }
    }
    //分页
    protected void btnDown_Click(object sender, EventArgs e)
    {
        if (Convert.ToInt32(lbNow.Text) + 1 <= Convert.ToInt32(lbTotal.Text))
        {
            lbNow.Text = Convert.ToString(Convert.ToInt32(lbNow.Text) + 1);

            RptDataBind(Convert.ToInt32(lbNow.Text), (List<Message>)Session["list"]);
        }
    }
    protected void btnFirst_Click(object sender, EventArgs e)
    {
        lbNow.Text = Convert.ToString(1);
        RptDataBind(1, (List<Message>)Session["list"]);
    }
    protected void btnLast_Click(object sender, EventArgs e)
    {
        lbNow.Text = lbTotal.Text;

        RptDataBind(Convert.ToInt32(lbTotal.Text), (List<Message>)Session["list"]);
    }
    protected void btnJump_Click(object sender, EventArgs e)
    {
        if (RequiredFieldValidator1.IsValid == true)
        {
            if (Convert.ToInt32(txtJump.Text) <= Convert.ToInt32(lbTotal.Text) && Convert.ToInt32(txtJump.Text) >= 1)
            {
                lbNow.Text = txtJump.Text;

                RptDataBind(Convert.ToInt32(txtJump.Text), (List<Message>)Session["list"]);
            }
        }
    }
    protected void btnUp_Click(object sender, EventArgs e)
    {
        if (Convert.ToInt32(lbNow.Text) - 1 >= 1)
        {
            lbNow.Text = Convert.ToString(Convert.ToInt32(lbNow.Text) - 1);

            RptDataBind(Convert.ToInt32(lbNow.Text), (List<Message>)Session["list"]);
        }
    }
}
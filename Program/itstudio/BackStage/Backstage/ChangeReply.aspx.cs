using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

public partial class BackStage_Backstage_ChangeReply : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        if (Session["username"] != null)
        {
            if (!IsPostBack)
            {
                try
                {
                    int id = Convert.ToInt32(Request.QueryString["id"]);
                    using (var db = new ITShowEntities())
                    {
                        Message message = db.Message.SingleOrDefault(a => a.MessageId == id);

                        txtReply.Text = message.MessageComment;
                    }
                }
                catch
                {
                    Response.Write("<script>alert('地址栏错误！');location='index.aspx'</script>");
                }
            }
        }
        else
        {
            Response.Write("<script>alert('尚未登陆！');location='Login.aspx'</script>");
        }
    }

    protected void BtnReply_Click(object sender, EventArgs e)
    {
        int id = Convert.ToInt32(Request.QueryString["id"]);
        if (txtReply.Text.Trim().Length > 0)
        {
            using (var db = new ITShowEntities())
            {
                if (txtReply.Text.Trim().Length > 90)
                {
                    Response.Write("<script>alert('字数超过限制')</script>");
                }
                else
                {
                    Message message = db.Message.SingleOrDefault(a => a.MessageId == id);

                    message.MessageComment = txtReply.Text.Trim();

                    message.MessageAdminName = Session["username"].ToString();

                    db.SaveChanges();

                    ClientScript.RegisterStartupScript(ClientScript.GetType(), "myscript", "<script >alert('回复成功');layer_close();</script>");
                }
            }
        }

    }
}
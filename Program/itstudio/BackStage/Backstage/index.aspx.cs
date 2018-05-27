using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

public partial class BackStage_index : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        if(Session["username"]==null)
        {
            Response.Write("<script>window.location='Login.aspx'</script>");
        }
        else
        {
            using (var db=new ITShowEntities())
            {
                var message = from it in db.Message where (it.MessageComment == null) select it;
                if (message.Count() != 0)
                {
                    lbMessage.Text = message.Count().ToString();
                }
            }
        }
    }
    protected void lkbtnExit_Click(object sender, EventArgs e)
    {
        Session["username"] = null;

        Response.Write("<script>window.location='Login.aspx'</script>");
    }
}
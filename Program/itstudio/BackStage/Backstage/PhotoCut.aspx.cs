using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.RegularExpressions;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

public partial class BackStage_Backstage_PhotoCut : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        if (Session["username"] == null)
        {
            Response.Write("<script>alert('尚未登陆！');window.location='Login.aspx'</script>");
        }
        else
        {
            if (!IsPostBack)
            {
                Regex r = new Regex("^[1-9]d*|0$");

                if (Request.QueryString["type"] != null && Request.QueryString["type1"] != null && r.IsMatch(Request.QueryString["type"]) && r.IsMatch(Request.QueryString["type1"]))
                {
                    int type = Convert.ToInt32(Request.QueryString["type"]);//标记是哪个模块的照片（大事件，成员，作品）

                    int type1 = Convert.ToInt32(Request.QueryString["type1"]);//标记是添加还是编辑

                    if (type <= 4 && type >= 1 && type1 <= 1 && type1 >= 0)
                    {
                        if (type1 == 1)
                        {
                            if (Request.QueryString["id"] != null && r.IsMatch(Request.QueryString["id"]))
                            {
                                int id = Convert.ToInt32(Request.QueryString["id"]);
                                using (var db = new ITShowEntities())
                                {
                                    switch (type)
                                    {
                                        case 1:
                                            Member person = (from it in db.Member where it.MemberId == id select it).FirstOrDefault();
                                            if (person == null)
                                                Response.Write("<script>alert('地址栏有误');location='index.aspx'</script>");
                                            break;

                                        case 2:
                                            Works person1 = (from it in db.Works where it.WorksId == id select it).FirstOrDefault();
                                            if (person1 == null)
                                                Response.Write("<script>alert('地址栏有误');location='index.aspx'</script>");
                                            break;

                                        case 3:
                                            Event person2 = (from it in db.Event where it.EventId == id select it).FirstOrDefault();
                                            if (person2 == null)
                                                Response.Write("<script>alert('地址栏有误');location='index.aspx'</script>");
                                            break;
                                        case 4:
                                            Admin person3 = (from it in db.Admin where it.AdminId == id select it).FirstOrDefault();
                                            if (person3 == null)
                                                Response.Write("<script>alert('地址栏有误');location='index.aspx'</script>");
                                            break;
                                    }
                                }
                            }
                            else
                                Response.Write("<script>alert('地址栏有误');location='index.aspx'</script>");
                        }
                        else if (type == 4)
                        {
                            try
                            {
                                string username = Request.QueryString["username"];

                                using (var db = new ITShowEntities())
                                {
                                    Admin person3 = (from it in db.Admin where it.AdminName == username select it).FirstOrDefault();
                                }
                            }
                            catch
                            {
                                Response.Write("<script>alert('地址栏有误');location='index.aspx'</script>");
                            }
                        }
                    }
                    else
                        Response.Write("<script>alert('地址栏有误');location='index.aspx'</script>");
                }
                else
                    Response.Write("<script>alert('地址栏有误');location='index.aspx'</script>");

            }

        }
    }
}

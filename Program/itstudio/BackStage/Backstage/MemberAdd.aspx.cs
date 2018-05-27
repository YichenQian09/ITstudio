using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

public partial class MemberAdd : System.Web.UI.Page
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

                if (Request.Cookies["arr"] != null)
                {
                    dropYear.SelectedValue = Server.UrlDecode(Request.Cookies["arr"]["year"]);
                    txtName.Text = Server.UrlDecode(Request.Cookies["arr"]["name"]);
                    dropDepartment.SelectedValue = Server.UrlDecode(Request.Cookies["arr"]["dpt"]);
                    txtIntruduction.Text = Server.UrlDecode(Request.Cookies["arr"]["instruction"]);
                    HttpCookie cookies = Request.Cookies["arr"];//删除cookies
                    cookies.Expires = System.DateTime.Now.AddDays(-1);
                    Response.Cookies.Add(cookies);
                }
                if (Request.Cookies["url"] != null)
                {
                    img.Visible = true;
                    img.ImageUrl = Request.Cookies["url"].Value;
                    HttpCookie cookies1 = Request.Cookies["url"];//删除cookies
                    cookies1.Expires = System.DateTime.Now.AddDays(-1);
                    Response.Cookies.Add(cookies1);

                }
            }
        }
    }

    protected void btnAdd_Click(object sender, EventArgs e)
    {
        string year = dropYear.SelectedValue;//届数

        string name = txtName.Text.Trim();

        string department = dropDepartment.SelectedValue;

        string instruction = txtIntruduction.Text;

   
        //string image =;

        if (name.Length > 0 && img.ImageUrl.Length > 0 && instruction.Length>0)
        {
            if (instruction.Length > 40)
            {
                Response.Write("<script>alert('字数超过限制')</script>");
            }
            else
            {
                using (var db = new ITShowEntities())
                {
                    Member person = new Member()
                    {
                        MemberDepartment = department,

                        MemberName = name,

                        MemberImage = img.ImageUrl,

                        MemberYear = year,

                        MemberInstruction = instruction,

                    };

                    db.Member.Add(person);

                    if (db.SaveChanges() == 1)
                        ClientScript.RegisterStartupScript(ClientScript.GetType(), "myscript", "<script >alert('添加成功');layer_close();</script>");
                    else
                        Response.Write("<script>alert('添加失败请重试')</script>");
                }
            }
        }

        else
            Response.Write("<script>alert('不能为空')</script>");
        }
    

    protected void btnImage_Click(object sender, EventArgs e)
    {
        HttpCookie cookie = new HttpCookie("arr");
        cookie.Values["year"] = Server.UrlEncode(dropYear.SelectedValue);
        cookie.Values["name"] = Server.UrlEncode(txtName.Text.Trim());
        cookie.Values["dpt"] = Server.UrlEncode(dropDepartment.SelectedValue);
        cookie.Values["instruction"] = Server.UrlEncode(txtIntruduction.Text);
        cookie.Expires = System.DateTime.Now.AddMinutes(3);
        Response.Cookies.Add(cookie);
       
        Response.Write("<script>location='PhotoCut.aspx?type=1&&type1=0'</script>");
    }
}
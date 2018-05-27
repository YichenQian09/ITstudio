using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Text.RegularExpressions;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

public partial class MemberEditor : System.Web.UI.Page
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
                Regex r = new Regex("^[1-9]d*|0$");


                if (Request.QueryString["id"] != null && r.IsMatch(Request.QueryString["id"]))
                {
                    int id = Convert.ToInt32(Request.QueryString["id"]);

                    using (var db = new ITShowEntities())
                    {
                        Member person = (from it in db.Member where it.MemberId == id select it).FirstOrDefault();

                        if (person != null)
                        {
                            dropYear.SelectedValue = person.MemberYear;

                            txtName.Text = person.MemberName;

                            dropDepartment.SelectedValue = person.MemberDepartment;

                     

                            btnImage.ImageUrl = person.MemberImage;//成员照片

                    

                            txtIntruduction.Text = person.MemberInstruction;

                       



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
                                btnImage.ImageUrl = Request.Cookies["url"].Value;
                                HttpCookie cookies1 = Request.Cookies["url"];//删除cookies
                                cookies1.Expires = System.DateTime.Now.AddDays(-1);
                                Response.Cookies.Add(cookies1);
                            }
                        }
                        else
                            Response.Write("<script>alert('地址栏有误');location='MemberList.aspx'</script>");
                    }

                }
                else
                    Response.Write("<script>alert('地址栏有误');location='MemberList.aspx'</script>");

            }
        }
    }
    protected void btnEditor_Click(object sender, EventArgs e)
    {
        int id = Convert.ToInt32(Request.QueryString["id"]);
        string name = txtName.Text.Trim();
        string instruction = txtIntruduction.Text;

        if (name.Length > 0 && instruction.Length>0&& btnImage.ImageUrl.Length>0)
        {
            using (var db = new ITShowEntities())//修改
            {
                Member person = (from it in db.Member where it.MemberId == id select it).FirstOrDefault();

                if (person.MemberImage == btnImage.ImageUrl && person.MemberInstruction == instruction && person.MemberName == name && person.MemberDepartment == dropDepartment.SelectedValue)
                    Response.Write("<script>alert('未修改');location='MemberList.aspx'</script>");
                else
                {
                    if (instruction.Length > 40)
                    {
                        Response.Write("<script>alert('字数超过限制')</script>");
                    }
                    else
                    {
                        person.MemberName = name;
                        person.MemberDepartment = dropDepartment.SelectedValue;
                        person.MemberImage = btnImage.ImageUrl;//修改图片
                        person.MemberYear = dropYear.SelectedValue;
                        person.MemberInstruction = instruction;
                        if (db.SaveChanges() == 1)
                            Response.Write("<script>alert('编辑成功');location='MemberList.aspx'</script>");
                        else
                            Response.Write("<script>alert('编辑失败请重试')</script>");
                    }
                }
            }
        }
        else
            Response.Write("<script>alert('不能为空')</script>");
    }

    protected void btnImage_Click(object sender, ImageClickEventArgs e)
    {
        int id = Convert.ToInt32(Request.QueryString["id"]);
        HttpCookie cookie = new HttpCookie("arr");
        cookie.Values["year"] = Server.UrlEncode(dropYear.SelectedValue);
        cookie.Values["name"] = Server.UrlEncode(txtName.Text.Trim());
        cookie.Values["dpt"] = Server.UrlEncode(dropDepartment.SelectedValue);
        cookie.Values["instruction"] = Server.UrlEncode(txtIntruduction.Text);
        cookie.Expires = System.DateTime.Now.AddMinutes(3);
        Response.Cookies.Add(cookie);

        Response.Write("<script>location='PhotoCut.aspx?type=1&&type1=1&&id="+id+"'</script>");
    }
}
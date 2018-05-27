using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Security.Cryptography;
using System.Text;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

public partial class BackStage_Backstage_Login : System.Web.UI.Page
{
    static private string xmlKeys;
    static public string xmlPublicKeys;
    protected void Page_Load(object sender, EventArgs e)
    {
        if (Request.Cookies["admin1"] != null)
        {
            HttpCookie cookie = Request.Cookies["admin1"];
            //this.userName.Attributes.Add("value", cookie.Values["name"]);
            //this.passWord.Attributes.Add("value", cookie.Values["password"]);
            userName.Text = cookie.Values["name"];
            passWord.Text = cookie.Values["password"];
        }
        if (!IsPostBack)
        {
            RSA.RSAKey(out xmlKeys,out xmlPublicKeys);
            publickey.Text = xmlPublicKeys;
        }
    }

    protected void BtnLogin_Click(object sender, EventArgs e)
    {
        if (Session["CheckCode"] != null)
        {
            string checkcode = Session["CheckCode"].ToString();

            if (this.TextBox1.Text == checkcode)
            {
                using (var db = new ITShowEntities())
                {
                    string password = Class1.md5(passWord.Text, 32);
                   
                    Admin admin = db.Admin.SingleOrDefault(a => a.AdminName == userName.Text.Trim() && a.AdminPassword == password);

                    if (admin == null)
                    {
                        passWord.Text = "密码";

                        Response.Write("<script>alert('用户名或密码错误！')</script>");
                    }
                    else
                    {
                        if (Session["username"] != null)
                        {
      
                                Session["username"] = userName.Text.Trim();

                                Response.Write("<script>alert('登录成功！');location='index.aspx'</script>");
                            
                        }
                        else
                        {
                            if (checkRemember.Checked)
                            {
                                HttpCookie userInfo = new HttpCookie("admin1");
                                //明文？？？

                                userInfo.Values["name"] = userName.Text;
                                userInfo.Values["password"] = passWord.Text;                           
                                userInfo.Expires = DateTime.Now.AddDays(15); // 15天记住我                              
                                Response.Cookies.Add(userInfo);
                            }
                            else
                            {
                                HttpCookie cookie = Response.Cookies["admin1"];
                                cookie.Expires = DateTime.Now.AddDays(-1);
                            }
                            Session["username"] = userName.Text.Trim();

                            Response.Write("<script>alert('登录成功！');location='index.aspx'</script>");
                        }
                    }
                }

            }
            else
            {
                passWord.Text = "密码";
                ClientScript.RegisterClientScriptBlock(this.GetType(), "", "alert('验证码输入错误!')", true);
            }
        }
    }
    static public string RSAEncrypt(string xmlPublicKey, string encryptString)
    {
        try
        {
            byte[] PlainTextBArray;
            byte[] CypherTextBArray;
            string Result;
            System.Security.Cryptography.RSACryptoServiceProvider rsa = new RSACryptoServiceProvider();
            rsa.FromXmlString(xmlPublicKey);
            //PlainTextBArray = (new UnicodeEncoding()).GetBytes(encryptString);
            UnicodeEncoding ByteConverter = new UnicodeEncoding();
            //Create byte arrays to hold original, encrypted, and decrypted data.
            PlainTextBArray = ByteConverter.GetBytes(encryptString);
            CypherTextBArray = rsa.Encrypt(PlainTextBArray, false);
            Result = Convert.ToBase64String(CypherTextBArray);
            return Result;
        }
        catch (Exception ex)
        {
            throw ex;
        }
    }


}
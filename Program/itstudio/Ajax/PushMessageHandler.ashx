<%@ WebHandler Language="C#" Class="PushMessageHandler" %>

using System;
using System.Web;
using System.Web.SessionState;

public class PushMessageHandler : IHttpHandler,IRequiresSessionState {

    public void ProcessRequest(HttpContext context)
    {
        try
        {
            context.Response.ContentType = "text/plain";
            string captcha = context.Request["captcha"];//验证码
            string photoIndex = context.Request["picture"];//头像
            string comment = context.Request["comment"];//留言

            IPManager manager = new IPManager();//查看IP是否用得频繁
            string IPAddress = manager.GetClientIPv4Address();
            XmlManager xmanager = new XmlManager();
            int ans = xmanager.Editor(IPAddress);
            int flag = 0;
            if (ans > 0)//能否写入IP
            {
                if (ans == 1)
                {
                    xmanager.Add(IPAddress);//如果没有这个IP，就加入记录

                    BadWordsFilter badwordfilter = new BadWordsFilter();                    //在此处对comment进行脏字处理
                                                                                            //初始化关键字
                    badwordfilter.Init();
                    //检查是否有存在关键字
                    bool a = badwordfilter.HasBadWord(comment);

                    if (a == false)
                    {
                        // System.Text.RegularExpressions.Regex regex1 = new System.Text.RegularExpressions.Regex(@"<script[\s\S]+</script *>", System.Text.RegularExpressions.RegexOptions.IgnoreCase);

                        //string comment = Server.HtmlDecode(comment0);

                        if (captcha == HttpContext.Current.Session["CheckCode1"].ToString())
                        {
                            string time = DateTime.Now.ToString();
                            string photoUrl = "images/p1.png";
                            //获取的对应图片信息
                            if (photoIndex == "0")
                            {
                                photoUrl = "images/p1.png";
                            }
                            if (photoIndex == "1")
                            {
                                photoUrl = "images/p2.png";
                            }
                            if (photoIndex == "2")
                            {
                                photoUrl = "images/p3.png";
                            }
                            if (photoIndex == "3")
                            {
                                photoUrl = "images/p4.png";
                            }
                            if (photoIndex == "4")
                            {
                                photoUrl = "images/p5.png";
                            }
                            if (photoIndex == "5")
                            {
                                photoUrl = "images/p6.png";
                            }
                            if (photoIndex == "6")
                            {
                                photoUrl = "images/p7.png";
                            }
                            if (photoIndex == "7")
                            {
                                photoUrl = "images/p8.png";
                            }
                            if (photoIndex == "8")
                            {
                                photoUrl = "images/p9.png";
                            }
                            using (var db = new ITShowEntities())
                            {
                                Message message = new Message();

                                message.MessageContent = comment;


                                message.MessageTime = Convert.ToDateTime(time);

                                message.MessagePhoto = photoUrl;

                                db.Message.Add(message);

                                db.SaveChanges();

                                flag = 4;



                            }
                        }
                        else
                            flag = 3;
                    }
                    else
                        flag = 2;
                }
                else
                    flag = 1;
            }
            else
            {
                flag = 0;
            }
            context.Response.Write(flag);
        }
        catch
        {
                context.Response.Write("0");
        }
    }

    public bool IsReusable {
        get {
            return false;
        }
    }

}
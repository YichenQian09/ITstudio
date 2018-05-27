<%@ Application Language="C#" %>

<script runat="server">

    void Application_Start(object sender, EventArgs e)
    {
        // 在应用程序启动时运行的代码
        System.Timers.Timer timer = new System.Timers.Timer(600000);

        timer.Elapsed += new System.Timers.ElapsedEventHandler(AddCount);

        //AddCount是一个方法，此方法就是每个1秒而做的事情
        timer.AutoReset = true;

        //给Application["timer"]一个初始值
        Application.Lock();

        Application["timer"] = 1;

        Application.UnLock();

        timer.Enabled = true;

    }
    private void AddCount(object sender,System.Timers.ElapsedEventArgs e)
    {
        Application.Lock();
        Application["timer"] = Convert.ToInt32(Application["timer"])+1;

        //这里写要执行的数据库操作

        using (var db = new ITShowEntities())
        {
            var message = from it in db.Message where it.MessageComment == null select it;

            var admin = from it in db.Admin where it.Flag == true select it;

            List<Admin> am = admin.ToList();

            // List < Message > ms = message.ToList();

            int me_count = message.Count();

            int am_count = admin.Count();

            int i = 0;
            if (me_count > 0)
            {
                for (; i < am_count; i++)
                {
                    //发送邮箱
                    Library.DAL.Send.Sendemails("17806282596@163.com", am[i].AdminEmail, "留言提醒", "共有'" + me_count + "'条评论，请尽快登录管理后台回复评论！");

                }
            }
        }
        Application.UnLock();
    }

    void Application_End(object sender, EventArgs e)
    {
        //  在应用程序关闭时运行的代码
        //下面的代码是关键，可解决IIS应用程序池自动回收的问题  

            System.Threading.Thread.Sleep(1000);

            //这里设置你的web地址，可以随便指向你的任意一个aspx页面甚至不存在的页面，目的是要激发Application_Start  
            string url = "BackStage/BackStage/Login.aspx";
            System.Net.HttpWebRequest myHttpWebRequest = (System.Net.HttpWebRequest)System.Net.WebRequest.Create(url);
            System.Net.HttpWebResponse myHttpWebResponse = (System.Net.HttpWebResponse)myHttpWebRequest.GetResponse();
            System.IO.Stream receiveStream = myHttpWebResponse.GetResponseStream();//得到回写的字节流 
    }

    void Application_Error(object sender, EventArgs e)
    {
        // 在出现未处理的错误时运行的代码

    }

    void Session_Start(object sender, EventArgs e)
    {
        // 在新会话启动时运行的代码

    }

    void Session_End(object sender, EventArgs e)
    {
        // 在会话结束时运行的代码。 
        // 注意: 只有在 Web.config 文件中的 sessionstate 模式设置为
        // InProc 时，才会引发 Session_End 事件。如果会话模式设置为 StateServer
        // 或 SQLServer，则不引发该事件。

    }

</script>

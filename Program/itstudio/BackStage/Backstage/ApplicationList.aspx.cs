using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Remoting.Contexts;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Data.Linq;
using System.Text;
using System.IO;
using System.Data;
using System.Reflection;

public partial class ApplicationList : System.Web.UI.Page
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
                using (var db = new ITShowEntities())
                {
                    List<Application> person;

                    person = (from it in db.Application orderby it.Time descending select it).ToList();

                   
                    Session["ds"] = person;

                    lbcount.Text = person.Count.ToString();//报名总数量

                    DataBindToRepeater(1, (List<Application>)Session["ds"]);
                }
            }
        }
    }


    protected void dropDepartment_SelectedIndexChanged(object sender, EventArgs e)
    {

        select();

        DataBindToRepeater(1, (List<Application>)Session["ds"]);

    }

    private void select()//条件查找
    {
        string keyword = txtKeyName.Text.Trim();

        string department = dropDepartment.SelectedValue;//选择的部门

        using (var db = new ITShowEntities())
        {
            List<Application> select;

            if (department == "全部")
            {

                if (keyword != "")//有搜索内容
                {
                    if (datemin.Value == "" && datemax.Value == "")//未设起始时间
                    {

                        //查询名字中含有某个字符的报名表
                        select = (from it in db.Application where (it.Name.Contains(keyword)) orderby it.Time descending select it).ToList();

                    }
                    else if (datemin.Value != "" && datemax.Value == "")//时间起点不为0
                    {


                        DateTime mindate = Convert.ToDateTime(datemin.Value);

                        select = (from it in db.Application where (it.Name.Contains(keyword) && it.Time > mindate) orderby it.Time descending select it).ToList();


                    }
                    else if (datemin.Value == "" && datemax.Value != "")//时间终点不为0
                    {
                        //终止时间
                        DateTime maxdate = Convert.ToDateTime(datemax.Value);

                        select = (from it in db.Application where (it.Name.Contains(keyword) && it.Time < maxdate) orderby it.Time descending select it).ToList();


                    }
                    else //if (datemin.Value != "" && datemax.Value != "")//时间起始均不为0
                    {
                        //开始时间

                        DateTime mindate = Convert.ToDateTime(datemin.Value);
                        //终止时间
                        DateTime maxdate = Convert.ToDateTime(datemax.Value);

                        select = (from it in db.Application where (it.Name.Contains(keyword) && it.Time < maxdate && it.Time > mindate) orderby it.Time descending select it).ToList();

                    }
                }
                else//无搜索内容
                {
                    if (datemin.Value == "" && datemax.Value == "")//未设起始时间
                    {

                        //查询名字中含有某个字符的报名表
                        select = (from it in db.Application orderby it.Time descending select it).ToList();

                    }
                    else if (datemin.Value != "" && datemax.Value == "")//时间起点不为0
                    {


                        DateTime mindate = Convert.ToDateTime(datemin.Value);

                        select = (from it in db.Application where ( it.Time > mindate) orderby it.Time descending select it).ToList();


                    }
                    else if (datemin.Value == "" && datemax.Value != "")//时间终点不为0
                    {
                        //终止时间
                        DateTime maxdate = Convert.ToDateTime(datemax.Value);

                        select = (from it in db.Application where ( it.Time < maxdate) orderby it.Time descending select it).ToList();


                    }
                    else //if (datemin.Value != "" && datemax.Value != "")//时间起始均不为0
                    {
                        //开始时间

                        DateTime mindate = Convert.ToDateTime(datemin.Value);
                        //终止时间
                        DateTime maxdate = Convert.ToDateTime(datemax.Value);

                        select = (from it in db.Application where ( it.Time < maxdate && it.Time > mindate) orderby it.Time descending select it).ToList();

                    }
                }
            }
            else//有部门
            {
                if (keyword != "")//有搜索内容
                {
                    if (datemin.Value == "" && datemax.Value == "")//未设起始时间
                    {

                        //查询名字中含有某个字符的报名表
                        select = (from it in db.Application where (it.Name.Contains(keyword)&& it.Department == department) orderby it.Time descending select it).ToList();

                    }
                    else if (datemin.Value != "" && datemax.Value == "")//时间起点不为0
                    {


                        DateTime mindate = Convert.ToDateTime(datemin.Value);

                        select = (from it in db.Application where (it.Name.Contains(keyword) && it.Time > mindate && it.Department == department) orderby it.Time descending select it).ToList();


                    }
                    else if (datemin.Value == "" && datemax.Value != "")//时间终点不为0
                    {
                        //终止时间
                        DateTime maxdate = Convert.ToDateTime(datemax.Value);

                        select = (from it in db.Application where (it.Name.Contains(keyword) && it.Time < maxdate && it.Department == department) orderby it.Time descending select it).ToList();


                    }
                    else //if (datemin.Value != "" && datemax.Value != "")//时间起始均不为0
                    {
                        //开始时间

                        DateTime mindate = Convert.ToDateTime(datemin.Value);
                        //终止时间
                        DateTime maxdate = Convert.ToDateTime(datemax.Value);

                        select = (from it in db.Application where (it.Name.Contains(keyword) && it.Time < maxdate && it.Time > mindate && it.Department == department) orderby it.Time descending select it).ToList();

                    }
                }
                else//无搜索内容
                {
                    if (datemin.Value == "" && datemax.Value == "")//未设起始时间
                    {

                        //查询名字中含有某个字符的报名表
                        select = (from it in db.Application where it.Department==department orderby it.Time descending select it).ToList();

                    }
                    else if (datemin.Value != "" && datemax.Value == "")//时间起点不为0
                    {


                        DateTime mindate = Convert.ToDateTime(datemin.Value);

                        select = (from it in db.Application where (it.Time > mindate && it.Department == department) orderby it.Time descending select it).ToList();


                    }
                    else if (datemin.Value == "" && datemax.Value != "")//时间终点不为0
                    {
                        //终止时间
                        DateTime maxdate = Convert.ToDateTime(datemax.Value);

                        select = (from it in db.Application where (it.Time < maxdate && it.Department == department) orderby it.Time descending select it).ToList();


                    }
                    else //if (datemin.Value != "" && datemax.Value != "")//时间起始均不为0
                    {
                        //开始时间

                        DateTime mindate = Convert.ToDateTime(datemin.Value);
                        //终止时间
                        DateTime maxdate = Convert.ToDateTime(datemax.Value);

                        select = (from it in db.Application where (it.Time < maxdate && it.Time > mindate && it.Department == department) orderby it.Time descending select it).ToList();

                    }
                }

            }
            Session["ds"] = select;

            lbdptCount.Text = select.Count.ToString();//该条件下的报名数量

        }

    }

    private void DataBindToRepeater(int currentPage, List<Application> datascore)
    {
        //foreach (var item in datascore)
        //{
        //    item.Introdution = Server.HtmlDecode(item.Introdution);
        //}

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
                Application person = (from it in db.Application where it.ApplicationId == id select it).FirstOrDefault();

                db.Application.Remove(person);

                if (db.SaveChanges() == 1)
                    Response.Write("<script>alert('删除成功');location='ApplicationList.aspx'</script>");
                else
                    Response.Write("<script>alert('删除失败请重试');location='ApplicationList.aspx'</script>");
            }
        }
    }

    protected void btnUp_Click(object sender, EventArgs e)
    {

        if (Convert.ToInt32(lbNow.Text) - 1 < 1)
            lbNow.Text = "1";

        else
            lbNow.Text = Convert.ToString(Convert.ToInt32(lbNow.Text) - 1);

        DataBindToRepeater(Convert.ToInt32(lbNow.Text), (List<Application>)Session["ds"]);
    }

    protected void btnDown_Click(object sender, EventArgs e)
    {

        if (Convert.ToInt32(lbNow.Text) + 1 <= Convert.ToInt32(lbTotal.Text))
            lbNow.Text = Convert.ToString(Convert.ToInt32(lbNow.Text) + 1);

        DataBindToRepeater(Convert.ToInt32(lbNow.Text), (List<Application>)Session["ds"]);
    }

    protected void btnFirst_Click(object sender, EventArgs e)
    {

        lbNow.Text = "1";

        DataBindToRepeater(Convert.ToInt32(lbNow.Text), (List<Application>)Session["ds"]);
    }

    protected void btnLast_Click(object sender, EventArgs e)
    {

        lbNow.Text = Convert.ToString(Convert.ToInt32(lbTotal.Text));

        DataBindToRepeater(Convert.ToInt32(lbNow.Text), (List<Application>)Session["ds"]);
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

        DataBindToRepeater(Convert.ToInt32(lbNow.Text), (List<Application>)Session["ds"]);
    }




    //protected void btnTime_Click(object sender, EventArgs e)
    //{
    //    string department = dropDepartment.SelectedValue;

    //    string time = txtTime.Value;

    //    if (time.Length > 0)
    //    {
    //        using (var db = new ITShowEntities())
    //        {
    //            List<Application> person;

    //            if (department == "全部")
    //            {
    //                person = (from it in db.Application where it.Time >= Convert.ToDateTime(time) orderby it.Time select it).ToList();

    //                //lbdpt.Visible = false;

    //                //lbdptCount.Visible = false;
    //            }

    //            else
    //            {
    //                person = (from it in db.Application where it.Time >= Convert.ToDateTime(time) && it.Department == department orderby it.Time select it).ToList();

    //                //lbdpt.Visible = true;

    //                //lbdptCount.Visible = true;

    //                //lbdptCount.Text = person.Count.ToString();//各部门报名数量
    //            }

    //            Session["ds"] = person;

    //            DataBindToRepeater(1, (List<Application>)Session["ds"]);

    //        }
    //    }
    //    else
    //        Response.Write("<script>alert('不能为空')</script>");
    //}


    //protected void btnDelete_Click(object sender, EventArgs e)
    //{
    //    lbDelete.Visible = true;
    //    txtTime1.Visible = true;
    //}

    //protected void lbDelete_Click(object sender, EventArgs e)
    //{
    //    string time = txtTime1.Value;

    //    if (time.Length > 0)
    //    {
    //        using (var db = new ITShowEntities())
    //        {
    //            List<Application> person = (from it in db.Application where it.Time <= Convert.ToDateTime(time) select it).ToList();

    //            int count = person.Count;
    //            foreach (var item in person)
    //            {
    //                db.Application.Remove(item);
    //            }
    //            if (db.SaveChanges() == count)
    //                Response.Write("<script>alert('删除成功')</script>");
    //            else
    //                Response.Write("<script>alert('删除失败请重试')</script>");

    //        }
    //    }
    //}
    protected void BtnImport_Click(object sender, EventArgs e)
    {
        if (DdlSelect.SelectedValue == "1")
        {
            ExportDataGrid("前端开发", "application/ms-excel", "前端开发.xls");
        }
        else if (DdlSelect.SelectedValue == "2")
        {
            ExportDataGrid("程序开发", "application/ms-excel", "程序开发.xls");
        }
        else if (DdlSelect.SelectedValue == "3")
        {
            ExportDataGrid("App开发", "application/ms-excel", "APP开发.xls");
        }
        else if (DdlSelect.SelectedValue == "4")
        {
            ExportDataGrid("UI设计", "application/ms-excel", "UI设计.xls");
        }
        else
        {
            ExportDataGrid("全部", "application/ms-excel", "全部报名表.xls");
        }
    }



    private void ExportDataGrid(string Job, string FileType, string FileName) //从DataGrid导出  
    {
        System.Web.UI.WebControls.DataGrid dg = new System.Web.UI.WebControls.DataGrid();

        //DataSet dg = new DataSet();

        using (var db =new ITShowEntities())
        {
            List<Application> dt;
            if (Job == "全部")
                dt = (from it in db.Application select it).ToList();
            else
                dt = (from it in db.Application
                      where it.Department == Job
                      select it).ToList();
            dg.DataSource = dt;

            //DataTable ds = LINQToDataTable(dt);

            //dg.Tables.Add(ds);
            //CreateExcel(ds, FileType, FileName);
        }
        dg.DataBind();

        //定义文档类型、字符编码　　   
        Response.Clear();
        Response.AppendHeader("Content-Disposition", "attachment;filename=" + HttpUtility.UrlEncode(FileName, Encoding.UTF8).ToString());
        Response.Charset = "UTF-8";
        Response.ContentEncoding = Encoding.Default;
        Response.ContentType = FileType;
        dg.EnableViewState = false;
        //定义一个输入流　　   
        StringWriter tw = new StringWriter();
        HtmlTextWriter hw = new HtmlTextWriter(tw);
        //目标数据绑定到输入流输出　  
        dg.RenderControl(hw);
        Response.Write(tw.ToString());
        Response.End();
    }
    public DataTable LINQToDataTable<T>(IEnumerable<T> varlist)
    {   //定义要返回的DataTable对象
        DataTable dtReturn = new DataTable();
        // 保存列集合的属性信息数组
        System.Reflection.PropertyInfo[] oProps = null;
        if (varlist == null) return dtReturn;//安全性检查
        //循环遍历集合，使用反射获取类型的属性信息
        foreach (T rec in varlist)
        {
            //使用反射获取T类型的属性信息，返回一个PropertyInfo类型的集合
            if (oProps == null)
            {
                oProps = ((Type)rec.GetType()).GetProperties();
                //循环PropertyInfo数组
                foreach (PropertyInfo pi in oProps)
                {
                    Type colType = pi.PropertyType;//得到属性的类型
                    //如果属性为泛型类型
                    if ((colType.IsGenericType) && (colType.GetGenericTypeDefinition()
                    == typeof(Nullable<>)))
                    {   //获取泛型类型的参数
                        colType = colType.GetGenericArguments()[0];
                    }
                    //将类型的属性名称与属性类型作为DataTable的列数据
                    dtReturn.Columns.Add(new DataColumn(pi.Name, colType));
                }
            }
            //新建一个用于添加到DataTable中的DataRow对象
            DataRow dr = dtReturn.NewRow();
            //循环遍历属性集合
            foreach (PropertyInfo pi in oProps)
            {   //为DataRow中的指定列赋值
                dr[pi.Name] = pi.GetValue(rec, null) == null ?
                    DBNull.Value : pi.GetValue(rec, null);
            }
            //将具有结果值的DataRow添加到DataTable集合中
            dtReturn.Rows.Add(dr);
        }
        return dtReturn;//返回DataTable对象

    }
    //public void CreateExcel(DataTable dt, string FileType, string FileName)
    //{
    //    Response.Clear();
    //    Response.Charset = "UTF-8";
    //    Response.Buffer = true;
    //    Response.ContentEncoding = System.Text.Encoding.GetEncoding("GB2312");
    //    Response.AppendHeader("Content-Disposition", "attachment;filename=\"" + System.Web.HttpUtility.UrlEncode(FileName, System.Text.Encoding.UTF8) + ".xls\"");
    //    Response.ContentType = FileType;
    //    string colHeaders = string.Empty;
    //    string ls_item = string.Empty;
    //    DataRow[] myRow = dt.Select();
    //    int i = 0;
    //    int cl = dt.Columns.Count;
    //    foreach (DataRow row in myRow)
    //    {
    //        for (i = 0; i < cl; i++)
    //        {
    //            if (i == (cl - 1))
    //            {
    //                ls_item += row[i].ToString() + "\n";
    //            }
    //            else
    //            {
    //                ls_item += row[i].ToString() + "\t";
    //            }
    //        }
    //        Response.Output.Write(ls_item);
    //        ls_item = string.Empty;
    //    }
    //    Response.Output.Flush();
    //    Response.End();
    //}
    protected void btnSelect_Click(object sender, EventArgs e)
    {
        select();
        DataBindToRepeater(1, (List<Application>)Session["ds"]);
    }
}
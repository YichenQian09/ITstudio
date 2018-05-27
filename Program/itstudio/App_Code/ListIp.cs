using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MyHttp
{
    /// <summary>
    /// ListIp 的摘要说明
    /// </summary>
    public class ListIp
    {

        private string ip;
        private int count;
        /// <summary>
        /// IP地址
        /// </summary>
        public string IP
        {
            get { return ip; }
            set { ip = value; }
        }
        /// <summary>
        /// 累加数量
        /// </summary>
        public int Count
        {
            get { return count; }
            set { count = value; }
        }
    }
    [Serializable]
    public class CartIp
    {
        public CartIp()
        {
            if (_listIp == null)
            {
                _listIp = new List<ListIp>();
            }
        }
        private List<ListIp> _listIp;
        public List<ListIp> _ListIp
        {
            get { return _listIp; }
            set { _listIp = value; }
        }
        /// <summary>
        /// 添加IP
        /// </summary>
        public void Insert(string ip)
        {
            int indexof = ItemLastInfo(ip);
            if (indexof == -1)
            {
                //不存在
                ListIp item = new ListIp();
                item.IP = ip;
                _listIp.Add(item);
            }
            else
            {
                _listIp[indexof].Count += 1;
            }
        }
        //判断IP是否存在
        public int ItemLastInfo(string ip)
        {
            int index = 0;
            foreach (ListIp item in _ListIp)
            {
                if (item.IP == ip)
                {
                    return index;//存在
                }
                index += 1;
            }
            return -1;//不存在
        }
        /// <summary>
        /// 获得IP的数量
        /// </summary>
        /// <param name="ip"></param>
        /// <returns></returns>
        public int GetCount(string ip)
        {
            foreach (ListIp item in _ListIp)
            {
                if (item.IP == ip)
                {
                    return item.Count;//存在
                }
            }
            return -1;//不存在
        }

    }
}
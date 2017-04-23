
using System.Data.SqlClient;
namespace LineManage.Services
{
    public static class SqlPool
    {
        static SqlPool()
        {
            LineMsErvice = new Services.SqlService("LineConn");
        }

        public static Services.SqlService LineMsErvice { get; private set; }
    }
}
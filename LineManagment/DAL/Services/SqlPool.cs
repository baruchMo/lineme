
using System.Data.SqlClient;
namespace DAL.Services
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
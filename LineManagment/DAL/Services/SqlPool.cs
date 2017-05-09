
using System.Data.SqlClient;
namespace DAL.Services
{
    public static class SqlPool
    {
        static SqlPool()
        {
            LineMsErvice = new DAL.Services.SqlService("LineConn");
        }

        public static DAL.Services.SqlService LineMsErvice { get; private set; }
    }
}
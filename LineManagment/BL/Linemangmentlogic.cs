using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BL
{
    public class Linemangmentlogic : IDisposable
    {

        public List<DAL.Models.Person> GetPerson()
        {
            var db = DAL.Services.SqlPool.LineMsErvice;
               

                using (var conn = db.StartConnection())
                {
                    var person = db.SelectAsList<DAL.Models.Person>(conn, "spLastPerson");

                    db.StopConnection(conn);

                    return person;
                }
            
        }
        public bool UpdatePerson(int Id,string Name)
        {
            {
                var service = DAL.Services.SqlPool.LineMsErvice;

                using (var conn = service.StartConnection())
                {

                    var result = service.Exec
                     (conn, "spInsertNewPerson",
                                new SqlParameter("@Id", Id),
                                new SqlParameter("@Name", Name));


                    service.StopConnection(conn);

                    return result;
                }
            }

        }

        
        
        public List<DAL.Models.All>  AllM()
        {
            var service = DAL.Services.SqlPool.LineMsErvice;

            using (var conn = service.StartConnection())
            {
                var all = service.SelectAsList<DAL.Models.All>(conn, "spGetAllLineOrder");

                service.StopConnection(conn);

                return all;
            }
        }

        
    
        public List<DAL.Models.ServiceTypes> ServiceTyp()
        {
            var service = DAL.Services.SqlPool.LineMsErvice;

            using (var conn = service.StartConnection())
            {
                var services = service.SelectAsList<DAL.Models.ServiceTypes>(conn, "spSelectService");

                service.StopConnection(conn);

                return services;
            }
        }

        
      
        public bool  All(int SuppCodeId,double Price,int PersonId)
        {
            var service = DAL.Services.SqlPool.LineMsErvice;

            using (var conn = service.StartConnection())
            {

                var result = service.Exec
                 (conn, "spInsertNewLineOrder",
                            new SqlParameter("@SuppCodeId", SuppCodeId),
                            new SqlParameter("@Price", Price = 0),
                            new SqlParameter("@PersonId", PersonId));


                service.StopConnection(conn);

                return result;
            }
        }



        
       
        public List<DAL.Models.BySupp>  ThelineBySupp()
        {
            var service = DAL.Services.SqlPool.LineMsErvice;

            using (var conn = service.StartConnection())
            {
                var bysup = service.SelectAsList<DAL.Models.BySupp>(conn, "spGetLineBySuppCodeId");

                service.StopConnection(conn);

                return bysup;
            }
        }
        
      
        public bool  PostDeal(int PersonId,int SuppCodeId,double Deal_setPrice)
        {
            var service = DAL.Services.SqlPool.LineMsErvice;

            using (var conn = service.StartConnection())
            {

                var result = service.Exec
                 (conn, "spUpdateSetDeal",

                  new SqlParameter("@PersonId", PersonId),
                new SqlParameter("@SuppCodeId", SuppCodeId),
                  new SqlParameter("@Deal_setPrice",Deal_setPrice));



                service.StopConnection(conn);

                return result;
            }
        }

        
        
        public bool  DeletePerson(int PersonId, int SuppCodeId)
        {
            var service = DAL.Services.SqlPool.LineMsErvice;

            using (var conn = service.StartConnection())
            {

                var result = service.Exec
                 (conn, "spDeletepersonLine",

                  new SqlParameter("@PersonId", PersonId), new SqlParameter("@SuppCodeId",SuppCodeId));



                service.StopConnection(conn);

                return result;
            }
        }
    
    public void Dispose()
        {
            // any operation which aim to free memory is welcomed here :)
        }
    }
}

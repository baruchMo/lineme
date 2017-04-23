using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace LineManage.Controllers
{
    public class LinemangmentController : ApiController
    {

        [HttpGet]
        [Route("api/Linemange/person/Theline")]
        public IHttpActionResult Theline()
        {
            var service = Services.SqlPool.LineMsErvice;

            using (var conn = service.StartConnection())
            {
                var result = service.SelectAsList<Models.Person>(conn, "spLastPerson");

                service.StopConnection(conn);

                return Ok(result);
            }
        }

        [HttpPost]
        [Route("api/Linemange/person/Theline")]
        public IHttpActionResult Theline([FromBody]Models.Person person)
        {
            var service = Services.SqlPool.LineMsErvice;

            using (var conn = service.StartConnection())
            {

                var result = service.Exec
                 (conn, "spInsertNewPerson",
                            new SqlParameter("@Id", person.Id),
                            new SqlParameter("@Name", person.Name));


                service.StopConnection(conn);

                return Ok(result);
            }
        }

        [HttpGet]
        [Route("api/Linemange/orderline/All")]
        public IHttpActionResult AllM()
        {
            var service = Services.SqlPool.LineMsErvice;

            using (var conn = service.StartConnection())
            {
                var result = service.SelectAsList<Models.All>(conn, "spGetAllLineOrder");

                service.StopConnection(conn);

                return Ok(result);
            }
        }

        [HttpGet]
        [Route("api/Linemange/orderline/ServiceTypes")]
        public IHttpActionResult ServiceTyp()
        {
            var service = Services.SqlPool.LineMsErvice;

            using (var conn = service.StartConnection())
            {
                var result = service.SelectAsList<Models.ServiceTypes>(conn, "spSelectService");

                service.StopConnection(conn);

                return Ok(result);
            }
        }

        [HttpPost]
        [Route("api/Linemange/orderline/All")]
        public IHttpActionResult All([FromBody]Models.All supplier)
        {
            var service = Services.SqlPool.LineMsErvice;

            using (var conn = service.StartConnection())
            {

                var result = service.Exec
                 (conn, "spInsertNewLineOrder",
                            new SqlParameter("@SuppCodeId", supplier.SuppCodeId),
                            new SqlParameter("@Price", supplier.Price = 0),
                            new SqlParameter("@PersonId", supplier.PersonId));


                service.StopConnection(conn);

                return Ok(result);
            }
        }

        

        [HttpGet]
        [Route("api/Linemange/BySupp/ThelineBySupp")]
        public IHttpActionResult ThelineBySupp()
        {
            var service = Services.SqlPool.LineMsErvice;

            using (var conn = service.StartConnection())
            {
                var result = service.SelectAsList<Models.BySupp>(conn, "spGetLineBySuppCodeId");

                service.StopConnection(conn);

                return Ok(result);
            }
        }
        [HttpPost]
        [Route("api/Linemange/orderline/deal")]
        public IHttpActionResult postDeal([FromBody]Models.All deal)
        {
            var service = Services.SqlPool.LineMsErvice;

            using (var conn = service.StartConnection())
            {

                var result = service.Exec
                 (conn, "spUpdateSetDeal",

                  new SqlParameter("@PersonId", deal.PersonId),
                new SqlParameter("@SuppCodeId", deal.SuppCodeId),
                            new SqlParameter("@Deal_setPrice", deal.Deal_setPrice));
                           


                service.StopConnection(conn);

                return Ok(result);
            }
        }

        [HttpPost]
        [Route("api/Linemange/orderline/remove")]
        public IHttpActionResult deletePerson([FromBody]Models.All id)
        {
            var service = Services.SqlPool.LineMsErvice;

            using (var conn = service.StartConnection())
            {

                var result = service.Exec
                 (conn, "spDeletepersonLine",

                  new SqlParameter("@PersonId", id.PersonId), new SqlParameter("@SuppCodeId", id.SuppCodeId));



                service.StopConnection(conn);

                return Ok(result);
            }
        }
    }
}

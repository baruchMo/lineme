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
            using (var bl = new BL.Linemangmentlogic())
            {              
                return Ok<List<DAL.Models.Person>>(bl.GetPerson());
            };
        }

        [HttpPost]
        [Route("api/Linemange/person/Theline")]
        public IHttpActionResult Theline([FromBody]DAL.Models.Person person)
        {
           
            using (var bl = new BL.Linemangmentlogic())
            {
                      
                return Ok<bool>(bl.UpdatePerson(person.Id,person.Name));
            }
        }

        [HttpGet]
        [Route("api/Linemange/orderline/All")]
        public IHttpActionResult AllM()
        {
           

            using (var bl = new BL.Linemangmentlogic())
            {
               

                return Ok<List<DAL.Models.All>>(bl.AllM());
            }
        }

        [HttpGet]
        [Route("api/Linemange/orderline/ServiceTypes")]
        public IHttpActionResult ServiceTyp()
        {
            using (var bl = new BL.Linemangmentlogic())
            {       
                return Ok<List<DAL.Models.ServiceTypes>>(bl.ServiceTyp());
            }
        }

        [HttpPost]
        [Route("api/Linemange/orderline/All")]
        public IHttpActionResult All([FromBody]DAL.Models.All supplier)
        {
           

            using (var bl = new BL.Linemangmentlogic())
            {
               return Ok<bool>(bl.All(supplier.SuppCodeId,supplier.Price,supplier.PersonId));
            }
        }

        

        [HttpGet]
        [Route("api/Linemange/BySupp/ThelineBySupp")]
        public IHttpActionResult ThelineBySupp()
        {
            using (var bl = new BL.Linemangmentlogic())
            {
                return Ok<List<DAL.Models.BySupp>>(bl.ThelineBySupp());
            }
        }
        [HttpPost]
        [Route("api/Linemange/orderline/deal")]
        public IHttpActionResult PostDeal([FromBody]DAL.Models.All deal)
        {
           

            using (var bl = new BL.Linemangmentlogic())
            {

                

                return Ok<bool>(bl.PostDeal(deal.PersonId,deal.SuppCodeId,deal.Deal_setPrice));
            }
        }

        [HttpPost]
        [Route("api/Linemange/orderline/remove")]
        public IHttpActionResult DeletePerson([FromBody]DAL.Models.All id)
        {
           

            using (var bl = new BL.Linemangmentlogic())
            {
                return Ok<bool>(bl.DeletePerson(id.PersonId,id.SuppCodeId));
            }
        }
    }
}

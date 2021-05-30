using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Simulation.Services.StatsMethods;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Simulation.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MeansController : ControllerBase
    {
        [HttpPost]
        public ActionResult PostMeanData(PruebaPromedios meansData)
        {
            float limitInf = meansData.CalculateLimitInferior();
            float limitSup = meansData.CalculateLimitSuperior();
            bool evenlyDistributed = meansData.areEvenlyDistributed();

            Response response = new Response();
            response.x = meansData.X;
            response.alpha = meansData.Alpha;
            response.alphaBy2 = meansData.Alpha / 2;
            response.area = 1 - (meansData.Alpha / 2);
            response.z = meansData.Z;
            response.limitInf = limitInf;
            response.limitSup = limitSup;
            response.evenlyDistributed = evenlyDistributed;

            return Ok(response);
        }
    }
        public class Response
        {
            public float x { get; set; }
            public float alpha { get; set; }
            public float alphaBy2 { get; set; }
            public float area { get; set; }
            public float z { get; set; }
            public float limitInf { get; set; }
            public float limitSup { get; set; }
            public bool evenlyDistributed { get; set; }
        }

}

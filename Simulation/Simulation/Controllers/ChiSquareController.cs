using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Simulation.DTOs;
using Simulation.Services.StatsMethods;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Simulation.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ChiSquareController : ControllerBase
    {
        [HttpPost]
        public ActionResult PostChiData(ChiDTO chiData)
        {
            PruebaFrecuencias chi = new PruebaFrecuencias()
            {
                RandomList = chiData.RandomList
            };

            chi.CalculateChiSquare(chiData.alpha);

            return Ok(chi);
        }
    }
}

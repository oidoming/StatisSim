using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Simulation.Services.Pi;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Simulation.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PiController : ControllerBase
    {
        [HttpPost]
        public ActionResult PostPi(List<float> randomNums)
        {
            (List<Pi> piInfo, float piValue) = Pi.GetPi(randomNums);

            PiResponse piResponse = new()
            {
                PiInfo = piInfo,
                Pi = piValue
            };

            return Ok(piResponse);
        }
    }

    public class PiResponse
    {
        public List<Pi> PiInfo { get; set; }
        public float Pi { get; set; }
    }
}

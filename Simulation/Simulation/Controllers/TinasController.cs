using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Simulation.Services.Tinas;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Simulation.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TinasController : ControllerBase
    {
        [HttpPost]
        public ActionResult PostTinas(List<float> randomNums)
        {
            (List<Tinas> tinas, string decision, float average) = Tinas.GenerateTinas(randomNums);

            TinasResult tinasResult = new()
            {
                Tinas = tinas,
                Decision = decision,
                Average = average
            };

            return Ok(tinasResult);
        }
    }

    public class TinasResult
    {
        public List<Tinas> Tinas { get; set; }
        public string Decision { get; set; }
        public float Average {get; set;}
    }
}

using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Simulation.Services.RandomNums;

namespace Simulation.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RandomNumsController : ControllerBase
    {
        private IPseudoRandomNums _pseudoRandomNums;

        public RandomNumsController(IPseudoRandomNums pseudoRandomNums)
        {
            _pseudoRandomNums = pseudoRandomNums;
        }

        [HttpGet]
        public ActionResult Get()
        {
            //var pseudoRandomNums = new PseudoRandomNums();
            return Ok();
        }

        [HttpPost]
        public ActionResult Post(PseudoRandomNums pseudoRandomNums)
        {
            _pseudoRandomNums = pseudoRandomNums;
            //pseudoRandomData = pseudoRandomNums;
            var randomNums = _pseudoRandomNums.GenerateNumbers();
            return Ok(randomNums);
        }
    }
}

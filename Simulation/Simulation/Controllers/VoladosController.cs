using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Simulation.DTOs;
using Simulation.Services.Volados;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Simulation.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class VoladosController : ControllerBase
    {
        [HttpPost]
        public ActionResult PostVolados(VoladosDTO voladosDTO)
        {
            (List<VoladosInfo> voladosInfos, float probOfWin) = Volados.GenerateVolados(voladosDTO.RandomNums, voladosDTO.Available, voladosDTO.Bet, voladosDTO.Goal);

            VoladosResponse voladosResponse = new()
            {
                VoladosInfos = voladosInfos,
                ProbOfWin = probOfWin
            };

            return Ok(voladosResponse);
        }
    }

    public class VoladosResponse
    {
        public List<VoladosInfo> VoladosInfos { get; set; }
        public float ProbOfWin { get; set; }
    }
}

using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Simulation.DTOs;
using Simulation.Services.NBA;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Simulation.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class NBAPlayerStatsController : ControllerBase
    {
        [HttpPost]
        public ActionResult PostPlayer(List<NBAPlayerDTO> players)
        {
            List<NBAPlayerStats> playersStats = NBAPlayerStats.GenerateStats(players);
            string bestPlayer = NBAPlayerStats.SelectPlayer(playersStats);

            NBAPlayersResponse response = new NBAPlayersResponse()
            {
                BestPlayer = bestPlayer,
                PlayersStats = playersStats
            };

            return Ok(response);
        }
    }

    public class NBAPlayersResponse
    {
        public string BestPlayer { get; set; }
        public List<NBAPlayerStats> PlayersStats { get; set; }
    }
}

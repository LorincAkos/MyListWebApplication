using MyListWebApplication.Models.Enums;

namespace MyListWebApplication.Models.DTOs
{
    public class AnimeDto
    {
        public string Id { get; set; } = string.Empty;
        public string Premier { get; set; } = string.Empty;
        public string Title { get; set; } = string.Empty;
        public string ImgUrl { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public DateTime StartDate { get; set; }
        public DateTime? EndDate { get; set; }
        public double Score { get; set; }
        public StatusType Status { get; set; }
        public int Episode { get; set; }
        public int Duration { get; set; }
        public string Studio { get; set; } = string.Empty;
        public int Rating { get; set; }
        public string Prequel { get; set; } = string.Empty;
        public string Sequel { get; set; } = string.Empty;
        public string Source { get; set; } = string.Empty;
        public List<GenreType> Genre { get; set; } = [];
    }
}

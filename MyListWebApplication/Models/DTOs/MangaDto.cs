using MyListWebApplication.Models.Enums;

namespace MyListWebApplication.Models.DTOs
{
    public class MangaDto
    {
        public string Id { get; set; } = string.Empty;
        public string Title { get; set; } = string.Empty;
        public string ImgUrl { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public DateTime StartDate { get; set; }
        public DateTime? EndDate { get; set; }
        public double Score { get; set; }
        public StatusType Status { get; set; }
        public int Volume { get; set; }
        public int Chapter { get; set; }
        public string Author { get; set; } = string.Empty;
        public int Rating { get; set; }
        public string Adaptation { get; set; } = string.Empty;
        public List<GenreType> Genre { get; set; } = [];
    }
}

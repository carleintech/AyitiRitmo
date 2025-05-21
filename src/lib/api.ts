// Auth API
export const authApi = {
  login: async (email: string, _password: string) => { // Changed 'password' to '_password'
    // For demo, we'll simulate a successful login
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          user: {
            id: '123',
            email,
            name: email.split('@')[0],
            isArtist: false,
          },
          token: 'mock_jwt_token',
        });
      }, 1000);
    });
  },

  signup: async (name: string, email: string, password: string, isArtist: boolean) => {
    // For demo, we'll simulate a successful signup
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          user: {
            id: '123',
            email,
            name,
            isArtist,
          },
          token: 'mock_jwt_token',
        });
      }, 1000);
    });
  },

  logout: async () => {
    // For demo, we'll just simulate the logout
    localStorage.removeItem('ayitiritmo_token');
    localStorage.removeItem('ayitiritmo_user');
    return true;
  },
};

// Tracks API
export const tracksApi = {
  fetchTrending: async () => {
    // For demo, we'll simulate fetching trending tracks
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          { id: '1', title: 'Dekole', artist: 'Boukman Eksperyans', album: 'Kalfou Danjere', plays: '1.2M', trending: 'up' },
          { id: '2', title: 'Pa Gen Pwoblèm', artist: 'Kai', album: 'Best of Kai', plays: '890K', trending: 'up' },
          { id: '3', title: 'Deklarasyon', artist: 'Roody Roodboy', album: 'Declarations', plays: '750K', trending: 'down' },
          { id: '4', title: 'Yon Ti Bo', artist: 'T-Vice', album: 'Best of T-Vice', plays: '620K', trending: 'up' },
          { id: '5', title: 'Sa Ou Fè Mwen', artist: 'Harmonik', album: 'World Hits', plays: '580K', trending: 'up' },
        ]);
      }, 800);
    });
  },

  fetchRecommended: async () => {
    // For demo, we'll simulate fetching recommended tracks
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          { id: '6', title: 'Konpa Mix', description: 'Your weekly mix of Haitian kompa music', image: 'kompa-mix.jpg', gradient: 'from-blue-700 to-purple-700' },
          { id: '7', title: 'Rasin Roots', description: 'Traditional Haitian rhythms for your soul', image: 'rasin-roots.jpg', gradient: 'from-green-700 to-emerald-700' },
          { id: '8', title: 'Rap Kreyòl Flow', description: 'The best of modern Haitian hip-hop', image: 'rap-kreyol.jpg', gradient: 'from-yellow-600 to-orange-700' },
          { id: '9', title: 'Carnival Energy', description: 'High-energy beats for your celebration', image: 'carnival-energy.jpg', gradient: 'from-haiti-red to-haiti-gold' },
          { id: '10', title: 'Discover Haiti', description: 'Fresh songs we think you\'ll love', image: 'discover-haiti.jpg', gradient: 'from-haiti-blue to-indigo-700' },
        ]);
      }, 800);
    });
  },

  fetchTrackById: async (id: string) => {
    // For demo, we'll simulate fetching a specific track
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          id,
          title: 'Dekole',
          artist: 'Boukman Eksperyans',
          album: 'Kalfou Danjere',
          releaseDate: '1992',
          duration: 245, // seconds
          audioSrc: '/audio/sample-track-1.mp3',
          coverImage: '/images/album-cover.jpg',
          genres: ['Rasin', 'Mizik Rasin'],
          artistImage: '/images/artist.jpg',
          plays: '1.2M',
          description: 'A classic song by the legendary Haitian group Boukman Eksperyans, featuring traditional rhythms and powerful vocals that reflect the cultural heritage of Haiti.',
          comments: [
            { id: 'c1', user: 'haiti_lover', text: 'Such a powerful song!', date: '2 days ago', likes: 24 },
            { id: 'c2', user: 'kompa_fan', text: 'This never gets old!', date: '1 week ago', likes: 15 },
            { id: 'c3', user: 'music_explorer', text: 'First time hearing this. Absolutely blown away!', date: '3 weeks ago', likes: 42 },
          ],
          relatedTracks: [
            { id: '2', title: 'Ke\'m Pa Sote', artist: 'Boukman Eksperyans', album: 'Kalfou Danjere' },
            { id: '3', title: 'Jou Malere', artist: 'Boukman Eksperyans', album: 'Vodou Adjae' },
            { id: '4', title: 'Papa Loko', artist: 'Boukman Eksperyans', album: 'Libertè' },
          ]
        });
      }, 800);
    });
  },
};

// Artist API
export const artistApi = {
  fetchStatistics: async () => {
    // For demo, we'll simulate fetching artist stats
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          totalStreams: '12,458',
          followers: '2,845',
          revenue: '$345.28',
          tracks: '28',
          streamTrend: '+8.3%',
          followerTrend: '+12.5%',
          revenueTrend: '+5.1%',
          trackTrend: '+2',
        });
      }, 800);
    });
  },

  fetchPerformance: async () => {
    // For demo, we'll simulate fetching performance data
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          topTracks: [
            { id: '1', title: 'Dekole', streams: '4,582', trend: 'up', revenue: '$145.23' },
            { id: '2', title: 'Ayiti Love', streams: '3,891', trend: 'up', revenue: '$122.64' },
            { id: '3', title: 'Rasin Roots', streams: '2,347', trend: 'down', revenue: '$78.19' },
            { id: '4', title: 'Konpa King', streams: '1,982', trend: 'up', revenue: '$65.45' },
          ],
          events: [
            { id: 'e1', title: 'Live Performance', date: 'May 25, 2025', time: '8:00 PM', status: 'confirmed' },
            { id: 'e2', title: 'Album Release', date: 'June 10, 2025', time: '12:00 AM', status: 'scheduled' },
            { id: 'e3', title: 'Fan Q&A Session', date: 'June 15, 2025', time: '6:30 PM', status: 'pending' },
          ],
          demographics: {
            locations: [
              { location: 'Haiti', percentage: 42 },
              { location: 'United States', percentage: 28 },
              { location: 'Canada', percentage: 14 },
              { location: 'France', percentage: 8 },
              { location: 'Other', percentage: 8 },
            ],
          },
          fanActivity: [
            { id: 'a1', username: 'marie_h', action: 'followed you', time: '2 hours ago' },
            { id: 'a2', username: 'jean_pierre123', action: 'liked your track \'Dekole\'', time: '4 hours ago' },
            { id: 'a3', username: 'haiti_lover', action: 'shared your album', time: '6 hours ago' },
            { id: 'a4', username: 'kompa_fan', action: 'commented: \'Love this new track!\'', time: 'yesterday' },
            { id: 'a5', username: 'music_addict', action: 'added \'Rasin Roots\' to their playlist', time: 'yesterday' },
          ],
        });
      }, 800);
    });
  },

  uploadTrack: async (trackData: FormData) => {
    // For demo, we'll simulate a track upload
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log('Track upload data:', trackData);
        resolve({
          success: true,
          trackId: 'new-track-123',
        });
      }, 2000);
    });
  },
};

// User API
export const userApi = {
  fetchProfile: async () => {
    // For demo, we'll simulate fetching user profile
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          id: '123',
          name: 'Jean Baptiste',
          email: 'jean@example.com',
          joinDate: 'May 2025',
          playlists: 12,
          following: 36,
          preferences: {
            favoriteGenres: ['Kompa', 'Rasin', 'Rap Kreyòl'],
            language: 'Kreyòl',
            audioQuality: 'High',
          },
          notifications: {
            email: true,
            newMusic: true,
            liveEvents: false,
            platformUpdates: true,
          },
        });
      }, 800);
    });
  },

  updateProfile: async (profileData: unknown) => {
    // For demo, we'll simulate updating the profile
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log('Profile update data:', profileData);
        resolve({
          success: true,
        });
      }, 1000);
    });
  },
};

// Library API
export const libraryApi = {
  fetchPlaylists: async () => {
    // For demo, we'll simulate fetching user playlists
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          { id: '1', name: 'Kompa Favorites', songs: 28, image: 'playlist1.jpg' },
          { id: '2', name: 'Carnival Hits', songs: 18, image: 'playlist2.jpg' },
          { id: '3', name: 'Rasin Classics', songs: 15, image: 'playlist3.jpg' },
          { id: '4', name: 'My Discovery Mix', songs: 25, image: 'playlist4.jpg' },
        ]);
      }, 800);
    });
  },

  fetchLikedSongs: async () => {
    // For demo, we'll simulate fetching liked songs
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          { id: '1', title: 'Rasanble', artist: 'RAM', album: 'RAM 6: Manman m se Ginen', duration: '5:32' },
          { id: '2', title: 'Sweet Caroline', artist: 'Tabou Combo', album: 'The Masters', duration: '4:45' },
          { id: '3', title: 'Pale Pale', artist: 'Carimi', album: 'Nasty Business', duration: '4:12' },
          { id: '4', title: 'Jodi a', artist: 'Nu Look', album: 'I Got This', duration: '6:03' },
          { id: '5', title: 'Ayiti Bang Bang', artist: 'Carimi', album: 'Buzz', duration: '5:18' },
        ]);
      }, 800);
    });
  },
};

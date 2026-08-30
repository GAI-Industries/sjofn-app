import {
  Alert,
  Image,
  ImageBackground,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

type EventCardProps = {
  title: string;
  subtitle: string;
  badge: string;
  icon: string;
  source: number;
  onPress: () => void;
};

type PromoSlotKind = 'internal' | 'partner' | 'sponsored';

type PromoSlotProps = {
  kind: PromoSlotKind;
  eyebrow: string;
  title: string;
  text: string;
  ctaLabel: string;
  onPress: () => void;
};

const C = {
  bg: '#FFF9F5',
  surface: '#FFFFFF',
  surfaceSoft: '#FFF2F4',
  rose: '#E72F69',
  roseDark: '#C92359',
  ink: '#232129',
  muted: '#746D72',
  border: '#EEDFD9',
  white: '#FFFFFF',
  gold: '#C99A48',
};

function EventCard({
  title,
  subtitle,
  badge,
  icon,
  source,
  onPress,
}: EventCardProps) {
  return (
    <Pressable style={styles.eventCard} onPress={onPress}>
      <ImageBackground
        source={source}
        resizeMode="cover"
        style={styles.eventImage}
        imageStyle={styles.eventImageRadius}
      >
        <View style={styles.eventShade}>
          <View style={styles.eventTopRow}>
            <View style={styles.eventIconCircle}>
              <Text style={styles.eventIcon}>{icon}</Text>
            </View>

            <View style={styles.eventBadge}>
              <Text style={styles.eventBadgeText}>{badge}</Text>
            </View>
          </View>

          <View style={styles.eventBottomRow}>
            <View style={styles.eventCopy}>
              <Text style={styles.eventTitle}>{title}</Text>
              <Text style={styles.eventSubtitle}>{subtitle}</Text>
            </View>

            <View style={styles.eventArrowCircle}>
              <Text style={styles.eventArrow}>›</Text>
            </View>
          </View>
        </View>
      </ImageBackground>
    </Pressable>
  );
}

function PromoSlot({
  kind,
  eyebrow,
  title,
  text,
  ctaLabel,
  onPress,
}: PromoSlotProps) {
  const kindLabel =
    kind === 'partner' ? 'PARTNER' : kind === 'sponsored' ? 'ANZEIGE' : 'SJÖFN';

  return (
    <Pressable style={styles.nativePromoCard} onPress={onPress}>
      <View style={styles.nativePromoTopRow}>
        <View style={styles.nativePromoBadge}>
          <Text style={styles.nativePromoBadgeText}>{kindLabel}</Text>
        </View>
        <Text style={styles.nativePromoMark}>✦</Text>
      </View>

      <Text style={styles.nativePromoEyebrow}>{eyebrow}</Text>
      <Text style={styles.nativePromoTitle}>{title}</Text>
      <Text style={styles.nativePromoText}>{text}</Text>

      <View style={styles.nativePromoFooter}>
        <Text style={styles.nativePromoHint}>Ausgewählt für SJÖFN</Text>
        <View style={styles.nativePromoButton}>
          <Text style={styles.nativePromoButtonText}>{ctaLabel}</Text>
          <Text style={styles.nativePromoButtonArrow}>›</Text>
        </View>
      </View>
    </Pressable>
  );
}

export default function HomeScreen() {
  function soon(label: string) {
    Alert.alert('SJÖFN', `${label} bauen wir als Nächstes.`);
  }

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Pressable style={styles.headerButton} onPress={() => soon('Menü')}>
            <Text style={styles.headerButtonText}>☰</Text>
          </Pressable>

          <View style={styles.brandWrap}>
            <Image
              source={require('../../assets/images/sjofn-logo.png')}
              style={styles.brandLogo}
              resizeMode="contain"
            />
          </View>

          <Pressable style={styles.headerButton} onPress={() => soon('Benachrichtigungen')}>
            <Text style={styles.headerButtonText}>♢</Text>
            <View style={styles.notificationDot} />
          </Pressable>
        </View>

        <View style={styles.nearbyRow}>
          <View style={styles.nearbyPill}>
            <View style={styles.liveDot} />
            <Text style={styles.nearbyText}>In deiner Nähe · </Text>
            <Text style={styles.nearbyStrong}>18 aktive Singles</Text>
          </View>
        </View>

        <Pressable style={styles.heroCard} onPress={() => soon('Entdecken')}>
          <ImageBackground
            source={require('../../assets/images/home/hero-home.jpg')}
            resizeMode="cover"
            style={styles.heroImage}
            imageStyle={styles.heroRadius}
          >
            <View style={styles.heroSoftOverlay}>
              <View style={styles.heroCopyPanel}>
                <Text style={styles.heroKicker}>DEINE BEGEGNUNG</Text>
                <View style={styles.heroTitleBlock}>
                  <Text style={styles.heroTitleLine} numberOfLines={1}>
                    Wie möchtest du
                  </Text>
                  <Text style={styles.heroTitleLine} numberOfLines={1}>
                    <Text style={styles.heroAccent}>heute</Text> jemanden
                  </Text>
                  <Text style={styles.heroTitleLine} numberOfLines={1}>
                    kennenlernen?
                  </Text>
                </View>

                <Text style={styles.heroText}>
                  Keine endlosen Profile. Wähle den Moment, der zu dir passt.
                </Text>

                <View style={styles.heroAction}>
                  <Text style={styles.heroActionText}>Entdecken</Text>
                  <Text style={styles.heroActionArrow}>›</Text>
                </View>
              </View>
            </View>
          </ImageBackground>
        </Pressable>

        <View style={styles.sectionHeader}>
          <View style={styles.sectionHeaderCopy}>
            <Text style={styles.sectionTitle}>Deine Events</Text>
            <Text style={styles.sectionSubtitle}>Wähle, wie dein Abend beginnen darf.</Text>
          </View>

          <Pressable onPress={() => soon('Alle Events')}>
            <Text style={styles.sectionLink}>Alle ansehen ›</Text>
          </Pressable>
        </View>

        <View style={styles.eventGrid}>
          <EventCard
            title="Heute Abend"
            subtitle="Spontan. Echt. Jetzt."
            badge="LIVE"
            icon="☾"
            source={require('../../assets/images/home/event-tonight.jpg')}
            onPress={() => soon('Heute Abend')}
          />

          <EventCard
            title="Speed Dating"
            subtitle="5 Minuten. Echte Verbindungen."
            badge="EVENT"
            icon="◷"
            source={require('../../assets/images/home/event-speed-dating.jpg')}
            onPress={() => soon('Speed Dating')}
          />

          <EventCard
            title="Blind Date"
            subtitle="Erst der Mensch, dann das Aussehen."
            badge="SPECIAL"
            icon="◉"
            source={require('../../assets/images/home/event-blind-date.jpg')}
            onPress={() => soon('Blind Date')}
          />

          <EventCard
            title="Secret Dates"
            subtitle="Geheim. Aufregend. Nur für Mutige."
            badge="SJÖFN"
            icon="♥"
            source={require('../../assets/images/home/event-secret-dates.jpg')}
            onPress={() => soon('Secret Dates')}
          />
        </View>

        <View style={styles.sectionHeaderCompact}>
          <Text style={styles.sectionTitle}>Meine Bereiche</Text>
          <Pressable onPress={() => soon('Meine Bereiche')}>
            <Text style={styles.sectionLink}>Alle ansehen ›</Text>
          </Pressable>
        </View>

        <Text style={styles.sectionSubtitle}>Deine Verbindungen auf einen Blick.</Text>

        <View style={styles.statsRow}>
          <Pressable style={styles.statCard} onPress={() => soon('Matches')}>
            <Text style={styles.statIcon}>♡</Text>
            <Text style={styles.statNumber}>12</Text>
            <Text style={styles.statLabel}>Matches</Text>
          </Pressable>

          <Pressable style={styles.statCard} onPress={() => soon('Chats')}>
            <Text style={styles.statIcon}>◌</Text>
            <Text style={styles.statNumber}>7</Text>
            <Text style={styles.statLabel}>Chats</Text>
          </Pressable>

          <Pressable style={styles.statCard} onPress={() => soon('Dates')}>
            <Text style={styles.statIcon}>□</Text>
            <Text style={styles.statNumber}>3</Text>
            <Text style={styles.statLabel}>Gebuchte Dates</Text>
          </Pressable>

          <Pressable style={styles.statCard} onPress={() => soon('Profil')}>
            <Text style={styles.statIcon}>♙</Text>
            <Text style={styles.statNumberSmall}>Mein</Text>
            <Text style={styles.statLabel}>Profil</Text>
          </Pressable>
        </View>

        <View style={styles.promoSectionHeader}>
          <View>
            <Text style={styles.promoSectionEyebrow}>EMPFEHLUNG</Text>
            <Text style={styles.promoSectionTitle}>Für deinen Abend</Text>
          </View>
          <Text style={styles.promoSectionNote}>dezent & ausgewählt</Text>
        </View>

        <PromoSlot
          kind="partner"
          eyebrow="REGIONALES SPECIAL"
          title="Ein Platz für besondere Empfehlungen"
          text="Hier können später ausgewählte Partner, lokale Erlebnisse oder gesponserte Events erscheinen – immer klar gekennzeichnet und passend zu SJÖFN."
          ctaLabel="Entdecken"
          onPress={() => soon('Partner Special')}
        />

        <Pressable style={styles.promoCard} onPress={() => soon('Speed Date Special')}>
          <ImageBackground
            source={require('../../assets/images/home/promo-speed-special.jpg')}
            resizeMode="cover"
            style={styles.promoImage}
            imageStyle={styles.promoRadius}
          >
            <View style={styles.promoShade}>
              <View style={styles.promoCopy}>
                <Text style={styles.promoKicker}>HEUTE 🔥</Text>
                <Text style={styles.promoTitle}>Speed Date Special</Text>
                <Text style={styles.promoText}>20:00 Uhr · nur 1,99 € pro Person</Text>
              </View>

              <View style={styles.promoButton}>
                <Text style={styles.promoButtonText}>Jetzt dabei sein</Text>
                <Text style={styles.promoButtonArrow}>›</Text>
              </View>
            </View>
          </ImageBackground>
        </Pressable>

        <Text style={styles.footer}>SJÖFN · GAI Industries</Text>
      </ScrollView>

      <View style={styles.navigation}>
        <Pressable style={styles.navItem}>
          <Text style={styles.navIconActive}>⌂</Text>
          <Text style={styles.navTextActive}>Start</Text>
          <View style={styles.navIndicator} />
        </Pressable>

        <Pressable style={styles.navItem} onPress={() => soon('Entdecken')}>
          <Text style={styles.navIcon}>⌕</Text>
          <Text style={styles.navText}>Entdecken</Text>
        </Pressable>

        <Pressable style={styles.navItem} onPress={() => soon('Events')}>
          <Text style={styles.navIcon}>□</Text>
          <Text style={styles.navText}>Events</Text>
        </Pressable>

        <Pressable style={styles.navItem} onPress={() => soon('Chats')}>
          <Text style={styles.navIcon}>◌</Text>
          <Text style={styles.navText}>Chats</Text>
        </Pressable>

        <Pressable style={styles.navItem} onPress={() => soon('Profil')}>
          <Text style={styles.navIcon}>○</Text>
          <Text style={styles.navText}>Profil</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: C.bg,
  },
  scroll: {
    paddingHorizontal: 18,
    paddingTop: 8,
    paddingBottom: 116,
  },
  header: {
    height: 70,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    borderWidth: 1,
    borderColor: C.border,
    backgroundColor: C.surface,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  headerButtonText: {
    color: C.ink,
    fontSize: 22,
    lineHeight: 24,
  },
  notificationDot: {
    position: 'absolute',
    top: 6,
    right: 6,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: C.rose,
  },
  brandWrap: {
    alignItems: 'center',
  },
  brandLogo: {
    width: 112,
    height: 70,
  },
  nearbyRow: {
    flexDirection: 'row',
    marginBottom: 14,
  },
  nearbyPill: {
    minHeight: 38,
    paddingHorizontal: 14,
    borderRadius: 19,
    borderWidth: 1,
    borderColor: C.border,
    backgroundColor: C.surface,
    flexDirection: 'row',
    alignItems: 'center',
  },
  liveDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: C.rose,
    marginRight: 8,
  },
  nearbyText: {
    color: C.muted,
    fontSize: 13,
  },
  nearbyStrong: {
    color: C.rose,
    fontSize: 13,
    fontWeight: '700',
  },
  heroCard: {
    height: 342,
    borderRadius: 30,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: C.border,
    backgroundColor: C.surface,
    marginBottom: 38,
  },
  heroImage: {
    flex: 1,
  },
  heroRadius: {
    borderRadius: 30,
  },
  heroSoftOverlay: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 18,
    paddingVertical: 16,
  },
  heroCopyPanel: {
    width: '58%',
    paddingHorizontal: 15,
    paddingTop: 14,
    paddingBottom: 13,
    borderRadius: 22,
    backgroundColor: 'rgba(255,249,245,0.92)',
  },
  heroKicker: {
    color: C.gold,
    fontSize: 9.5,
    fontWeight: '800',
    lineHeight: 13,
    letterSpacing: 1.8,
    marginBottom: 8,
  },
  heroTitleBlock: {
    marginTop: 2,
  },
  heroTitleLine: {
    color: C.ink,
    fontSize: 22,
    lineHeight: 28,
    fontWeight: '800',
    letterSpacing: -0.2,
  },
  heroAccent: {
    color: C.rose,
  },
  heroText: {
    color: C.muted,
    fontSize: 12,
    lineHeight: 17,
    marginTop: 8,
  },
  heroAction: {
    alignSelf: 'flex-start',
    minWidth: 142,
    height: 40,
    borderRadius: 20,
    backgroundColor: C.rose,
    paddingHorizontal: 16,
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  heroActionText: {
    color: C.white,
    fontSize: 13.5,
    fontWeight: '700',
  },
  heroActionArrow: {
    color: C.white,
    fontSize: 21,
    marginLeft: 8,
    marginTop: -1,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginBottom: 14,
  },
  sectionHeaderCopy: {
    flex: 1,
    paddingRight: 10,
  },
  sectionHeaderCompact: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 2,
  },
  sectionTitle: {
    color: C.ink,
    fontSize: 29,
    lineHeight: 33,
    fontWeight: '800',
  },
  sectionSubtitle: {
    color: C.muted,
    fontSize: 14,
    lineHeight: 20,
    marginTop: 4,
    marginBottom: 14,
  },
  sectionLink: {
    color: C.rose,
    fontSize: 14,
    fontWeight: '700',
    paddingBottom: 2,
  },
  eventGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  eventCard: {
    width: '48.5%',
    height: 196,
    borderRadius: 24,
    overflow: 'hidden',
    marginBottom: 12,
    backgroundColor: '#211720',
  },
  eventImage: {
    flex: 1,
  },
  eventImageRadius: {
    borderRadius: 24,
  },
  eventShade: {
    flex: 1,
    padding: 12,
    justifyContent: 'space-between',
    backgroundColor: 'rgba(18,8,16,0.27)',
  },
  eventTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  eventIconCircle: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: 'rgba(255,255,255,0.94)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  eventIcon: {
    color: C.rose,
    fontSize: 17,
  },
  eventBadge: {
    minHeight: 26,
    borderRadius: 13,
    paddingHorizontal: 10,
    backgroundColor: 'rgba(255,255,255,0.91)',
    justifyContent: 'center',
  },
  eventBadgeText: {
    color: C.roseDark,
    fontSize: 9,
    fontWeight: '800',
    letterSpacing: 1,
  },
  eventBottomRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  eventCopy: {
    flex: 1,
    paddingRight: 6,
  },
  eventTitle: {
    color: C.white,
    fontSize: 21,
    lineHeight: 24,
    fontWeight: '800',
    textShadowColor: 'rgba(0,0,0,0.45)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 4,
  },
  eventSubtitle: {
    color: 'rgba(255,255,255,0.91)',
    fontSize: 12,
    lineHeight: 17,
    marginTop: 5,
    textShadowColor: 'rgba(0,0,0,0.45)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
  eventArrowCircle: {
    width: 39,
    height: 39,
    borderRadius: 20,
    backgroundColor: C.rose,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  eventArrow: {
    color: C.white,
    fontSize: 25,
    lineHeight: 25,
    marginTop: -2,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 22,
  },
  statCard: {
    width: '23.4%',
    minHeight: 112,
    borderRadius: 19,
    borderWidth: 1,
    borderColor: C.border,
    backgroundColor: C.surface,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 5,
  },
  statIcon: {
    color: C.rose,
    fontSize: 19,
    lineHeight: 21,
    marginBottom: 5,
  },
  statNumber: {
    color: C.ink,
    fontSize: 29,
    lineHeight: 31,
    fontWeight: '800',
  },
  statNumberSmall: {
    color: C.ink,
    fontSize: 19,
    lineHeight: 24,
    fontWeight: '800',
  },
  statLabel: {
    color: C.muted,
    fontSize: 10,
    lineHeight: 14,
    textAlign: 'center',
    marginTop: 3,
  },
  promoSectionHeader: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    marginTop: 2,
    marginBottom: 10,
  },
  promoSectionEyebrow: {
    color: C.gold,
    fontSize: 9,
    fontWeight: '800',
    letterSpacing: 1.6,
    marginBottom: 3,
  },
  promoSectionTitle: {
    color: C.ink,
    fontSize: 22,
    lineHeight: 27,
    fontWeight: '800',
  },
  promoSectionNote: {
    color: C.muted,
    fontSize: 10,
    paddingBottom: 3,
  },
  nativePromoCard: {
    borderRadius: 24,
    borderWidth: 1,
    borderColor: '#EAD7CE',
    backgroundColor: '#FFF4EE',
    padding: 17,
    marginBottom: 16,
    shadowColor: '#9F6D5C',
    shadowOpacity: 0.08,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 7 },
    elevation: 2,
  },
  nativePromoTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 14,
  },
  nativePromoBadge: {
    alignSelf: 'flex-start',
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: '#F8E2E7',
  },
  nativePromoBadgeText: {
    color: C.roseDark,
    fontSize: 9,
    fontWeight: '800',
    letterSpacing: 1.2,
  },
  nativePromoMark: {
    color: C.gold,
    fontSize: 19,
  },
  nativePromoEyebrow: {
    color: C.gold,
    fontSize: 9,
    fontWeight: '800',
    letterSpacing: 1.4,
    marginBottom: 6,
  },
  nativePromoTitle: {
    color: C.ink,
    fontSize: 21,
    lineHeight: 26,
    fontWeight: '800',
  },
  nativePromoText: {
    color: C.muted,
    fontSize: 12,
    lineHeight: 17,
    marginTop: 7,
  },
  nativePromoFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  nativePromoHint: {
    color: '#A68E86',
    fontSize: 9.5,
    flex: 1,
    paddingRight: 10,
  },
  nativePromoButton: {
    minHeight: 40,
    borderRadius: 20,
    paddingHorizontal: 14,
    backgroundColor: C.rose,
    flexDirection: 'row',
    alignItems: 'center',
  },
  nativePromoButtonText: {
    color: C.white,
    fontSize: 12,
    fontWeight: '700',
  },
  nativePromoButtonArrow: {
    color: C.white,
    fontSize: 19,
    marginLeft: 6,
    marginTop: -1,
  },
  promoCard: {
    height: 138,
    borderRadius: 24,
    overflow: 'hidden',
    marginBottom: 20,
  },
  promoImage: {
    flex: 1,
  },
  promoRadius: {
    borderRadius: 24,
  },
  promoShade: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    backgroundColor: 'rgba(68,12,39,0.62)',
  },
  promoCopy: {
    flex: 1,
    paddingRight: 8,
  },
  promoKicker: {
    color: '#FFD074',
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 1.3,
  },
  promoTitle: {
    color: C.white,
    fontSize: 21,
    lineHeight: 25,
    fontWeight: '800',
    marginTop: 3,
  },
  promoText: {
    color: 'rgba(255,255,255,0.88)',
    fontSize: 11,
    lineHeight: 16,
    marginTop: 3,
  },
  promoButton: {
    minHeight: 46,
    borderRadius: 23,
    backgroundColor: C.rose,
    paddingHorizontal: 14,
    flexDirection: 'row',
    alignItems: 'center',
  },
  promoButtonText: {
    color: C.white,
    fontSize: 12,
    fontWeight: '700',
  },
  promoButtonArrow: {
    color: C.white,
    fontSize: 20,
    marginLeft: 6,
    marginTop: -1,
  },
  footer: {
    textAlign: 'center',
    color: '#AAA1A5',
    fontSize: 10,
    letterSpacing: 1.2,
    marginBottom: 4,
  },
  navigation: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: 90,
    paddingBottom: 14,
    borderTopWidth: 1,
    borderTopColor: C.border,
    backgroundColor: 'rgba(255,249,245,0.985)',
    flexDirection: 'row',
    alignItems: 'center',
  },
  navItem: {
    flex: 1,
    height: 66,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  navIcon: {
    color: '#989196',
    fontSize: 20,
    lineHeight: 22,
  },
  navIconActive: {
    color: C.rose,
    fontSize: 20,
    lineHeight: 22,
  },
  navText: {
    color: '#989196',
    fontSize: 10,
    marginTop: 3,
  },
  navTextActive: {
    color: C.rose,
    fontSize: 10,
    fontWeight: '700',
    marginTop: 3,
  },
  navIndicator: {
    position: 'absolute',
    bottom: 0,
    width: 28,
    height: 3,
    borderRadius: 2,
    backgroundColor: C.rose,
  },
});

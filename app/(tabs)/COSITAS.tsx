import React, { useState } from "react";
import {
  Dimensions,
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
 
import { router } from "expo-router";
import { Ionicons, MaterialCommunityIcons, FontAwesome5 } from "@expo/vector-icons";

 
const { width } = Dimensions.get("window");
 
const categories = [
  {
    name: "Nachos",
    image:
      "https://recipesreverie.com/wp-content/uploads/2025/08/alaydifadi37_Image_showcases_a_vibrant_and_appetizing_plate_o_341c93cd-e9d5-4493-a064-d0e859c3f0ba_0.jpg",
  },
  {
    name: "Trail mix",
    image:
      "https://www.bing.com/images/search?view=detailV2&ccid=0ml9uck4&id=E296815B5836B68C6966B528821174B67C6CBD6A&thid=OIP.0ml9uck4vTpCrjwwph0E1gHaLH&mediaurl=https%3a%2f%2fwww.walderwellness.com%2fwp-content%2fuploads%2f2019%2f08%2fHealthy-Homemade-Trail-Mix-Walder-Wellness-4.jpg&cdnurl=https%3a%2f%2fth.bing.com%2fth%2fid%2fR.d2697db9c938bd3a42ae3c30a61d04d6%3frik%3dar1sfLZ0EYIotQ%26pid%3dImgRaw%26r%3d0&exph=5184&expw=3456&q=Trail+mix&FORM=IRPRST&ck=831FCCEA99F3858F227B66E01A5A5DEA&selectedIndex=4&itb=0",
  },
  {
    name: "Chicken nuggets",
    image: "https://thecleaneatingcouple.com/wp-content/uploads/2023/06/homemade-chicken-nuggets-1.jpg"
  },
  {
    name: "Onion rings",
    image:
      "https://i.pinimg.com/originals/00/92/6b/00926bbec43edce93643f4eafa21312b.png"
  },
];
 
export default function App() {
  const [search, setSearch] = useState("");
  const [active, setActive] = useState("home");
 
  const filteredCategories = categories.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );
 
  function If(arg0: boolean) {
    throw new Error("Function not implemented.");
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="#FFD34E"
      />
 
      <View style={styles.container}>
 
        {}
 
        <View style={styles.header}>
 
          <Image
            source={{
              uri: "data:image/webp;base64,UklGRlAVAABXRUJQVlA4IEQVAACQWACdASqrALQAPp1CmUmlo6KkK7eskLATiUAZAw7thvX/XEMd0y+J6Wdv15svOk9Ou9C70naWTXzYEaBeXulUDZPz0AZ1v1AyG0CPGZ0OvYPsGdJ792vZO/cwfn/q9ehKqDqUSSLiDvvRhauaKXnLBmv8r5ZO400+NzEj/yu5hxDyYRxwVchmD3/tQveBTJ3hsL9uv8qF1no58aIlYWKyJty0Eqg3fZ5/YLAGo8z6CSStSaCFMMcJlLgkORWSNYrs9mWyD4ygrGC4RKwW///09e69vm1UALVu94ww3T14X/zFI3NailW3Yu8+D9ookNoF+tVbMl3cs2/crmh3f0Gt4wVvWQETJdGZv45lMvxp2qYi4dQ9FHNGFPf0wIbHgIkmGbLSb/m8GmrCu/dt3Pjt3lu6TfA0cTU+RJ2/V9JwkoLwEjVgS+LOWmkGf5eqHodvynPli7TiQK2/1vxIcOHBpPLgulweEGnGH0aasXNN2LC1ef+bCTudsqdOwYlvl3OZQyKDLy3ZjmdoLKz3mupoxNAunrKsgdexx1ittd59cDb2HCCPLKSv30BwoCE0qNKus7xiZuWOxIlcgFG9duAtape9/ZCvttREm4JENOzEbZo+RpMMHYNi9O5aJoeSYXhueKD1G5VlX5EtTX67eSstTFcBjKX/wCHFyG7CvQjUsVj8V3+8ZOgw6FKg3vpkNRqqfDwWgRDPz0Y0h+zMQLImVDUz2REE6uHT/3fjwvTXtA9RHn2cayHyEpUNyehZeU4i5vkIxXbrOTBZufW2Favl/qRtnfiyNhJS91pdB+9y9WH2llDqbdMtI2OGWokyQk5qRXKRuXnY/AQ1O5+QYenT6speQP3uL5L6w/8rGjbMqqbPUCV6EAFuqNg5tCiVTrSndAiMenkvdBHAqNaxqCGOj7kMFTjc5pVnqqipBWqZGWwVS10hS4jv9OFH21AA/sJYjAcPDVwOuQKmwN8Ar7qJl4JFYrwC8PkUfzLJanGtUY8eu0IVReq8bujs3jS2KO//nEysfiLjf3eDymeHCm/OxPL75B9AdYg6NdpVor3VhEsr806aSYP9dL9wIuiqHbkbLc54cZ9NA85vnSjy0fuGQB/WFjnFX6G2035JYV46suKWgiedhKpJvX+RmPnmy0Hv5EfbjhdUqWMucqo7OJrABKE9z/G+fnQ0hPdl6KN+OF6QewzwZjed6SbT9duBVfU6QHAAw8RA/Mr2e1/e6DoNR88D2n66a0erkO5NvRX6rdij5QIW+zFKKZSd4LlF85b2a+TFRQHcKeTNphYfObC4LPll3LKMReu3OWXOztUe/RuXe+ZaoVFbg5r79mGJbQMKFyWFW+JSQXG4BitpuT1yLfHV4Eck5MknhypiBfqhCDG8jGv6qBV1r6n+M6r9XcglxP1oDrE1jePdU7/hestHfwCdJ2TiPHNoXG90ehKOJPB+jZWMmqWmYzMI04n1bQh2YLDiuQZEpavp+RjRq+XTYI3mbrO+gOYe8KoDfNvjL25GL6YPLF+2BvhgzP2m/XINHho3coy8r2wcc9C0yR+GZdVti6El2gRncdqWg/SNggl3LVF/Mtui3Tb2SomuHL8gW9pkXpOYcyChoTnD9b0PRIfFU2RCxdmBYlyWfICj6wHqsLqWMKQowX6ZicUTsQ0qGriDZsKw8Zt1XdfrnZBavOrOnS8Olk0d8aWeug+WtWXqx//UjOSYryXHM1Hv/3js+l3izzNH32FTVSDubYYxbV50zD/BZX6t2JOO1lE+NjWWtlQi1snLEaDA8Grk5pt+aqVAg9wDblC7yQ57TqurCdndcPRpE8Fk7/u4GTnuaHyd1dBkt710W56n/cTkeF+mVvRQaA10/xKShSOqas10/xNwCPouaaPRIXS1VDVHPSW9WTJjUrnztHEtzCAcBeQHqJIdcDpnMzO8LLRQ9UU3E2Noc5r7kLMxZbwkrMjHG6tTCEUnHPdarirWATAq9EsjH6BSfn4WCEJDRNZ2Xp7FWY+nh/aOqr6UWdPYg7sSYLCv5Ze9686Dy/i4uCLP+AyUSrtVBOZZmf3nGBEyn62z1ZnO8v7+jPwlQV62pEuQAaPUfD7p9nrjgymKbr6Tv2mH6C+0/j1Z8GjoqGlZqzsdo56WimQqK+lxtAcvtYIQqEqfLdBm1eSyD9Wa/2jiI6+pmxyO+exZV6IblfT4etifQh1KLBsvMcrzoVfsaW6tNCZo8KQps0S8OtX3YasA5jnDPwurA7NHbihh4J7OEdk1gviqwlr2ToKlJuoBsR9KnyrLm+aFZgP3GSs9HNlGqUbYUnupR6HEfZ11OD+P3yRPohZGJI+SRMJwDZXAlNeVpsyIVXSnmP9QgLO4WWje5bZ2gB0kDxCq43p/CJqjD0ZoEqJBCQ0a1NhN/BkIy344s06bLBzz7AOFFNa7UaYCm909MCKHnfaZRTQKzbLbLA8CzVBDQEwt2Igxa1aYNryJu2AqM9+J5dNmTB6oDzSOtMth8TiEzivueWsCGkBg1Hh5i2e6le79E1lP6jvIHcm1YYqwZNgn+BwN1PZz3daiu8n9P244WpMeUBlbUlWRSB/l6YKsPHTz0qm+avvwItZ9Qj5BU2C38fMakG9c/RZDh3rGlPSAccD+PGj+Vc7dK+yyhPwW/CrdZ5d9j062ZfgYfmfB+1d40yYVOW31AdOR43D8AuJ20ulEoZBttugB8nHM6Dwn+M2Oc4JduR7BS+V8ksjXvEY2GzceHsEgRnI4jd7Rs1VcFaZk+fjtxHtKjHiiP5KziGnjoxkh6mz8jHidQQ0k4IE7cvcqGRLoRLskULmdema8itzZ31xjgMlxvCowUHP9dxnrvhMxMwa3xMpIQtNj729/BmbLuaMQkkleq7g95KF9xd00Nbrtwgj0XIjvnYaQzwWomaVMuvabD+STWxcnwWa8pWjpT/NvvOLXTRnFH6EA/3yj/X6jALYCvTcEaa59nKD28eXPPafxy3pUsPT7Lutf/KeFuZdE+cExEIMMaoq06yYe7EAgm4n+NDuutXDUvBCVhOymZ0L/gAbdMOEiMdA2FFEx+hrPegrWL1i5WgqfQ7risNzHKUkmjsG/uCbocjAnaWmGtdSb2iQLq2XV1PG//+G5yNZjqoplqBR4E4A2SFcTq8xGAW2D681+pn5ZRZ+/rFpJgvAlWKcXlICOzdlgKQGuPCujp1MjZbUv/M8rVqIjX7NKAE0PtLpW/qPoEFqctEE/qABccH9xOpPGswWq94yNkvaQlARcITwZPW9Ht707eN2FGieiDz5AeNPappu4/tFLJkr0D3sn0VPVBAL3+qr15aEGX7BTS5HkLi3tllXI1ZjYtE1FM0e/veckHezMql19YC7ne0OfcNmh9aYRGpbXMF4cXTC/NBTmtII1O1k0XKYwfT9qDlbG8Od1+bvk8yRPSjjFxcbgbe08SnLZuoLmpSLyn4kkolVRqZISIjFJZgd+ljiWf/cwx+eiK3Y7R8k5H8vMIQt25nyVXBHo6Bi7tnsVzbgaNhLBoayfN5txtVefuq6LQ432SO0hEsOy/a5Ae8AHnfdMi5qSJg8wYvaOp8SwWg6NbRdnnsRq6E5V+b0HEOoyK4o7ijfPZ71GwPVT8rSFiP3X5cEZBYeNIdXBm/EElM19IqdqpQUc6+MUEGlTj3dUAfAv1wv+s/+1FjC/6IsicS9T2qROQpo3LnJ0keL+NbVqnpG31YwXsG18GhU6yyqWNnNMLZQ4Z2WKfsoVt8FsdIDLC425U79N09DnPFwjTfLpB9GaWB43boPY0vI1u6FQmC7jMpJT2nT4T/8TBwxVasDY3kfRZm7AAQDZbFrA1TqOQE4sughtZb9WYTcoz0v8kIb7wU74V/wvX3JCoIUjLW+Y5MtZopQnfBGOQEA4ScLa96LpJBweB0e7gwg9751vwuHftITr58GSyPDDRySN0FIK1MuP3vWB3o2cVRXtjOKYruoEn3HCZ5+Z+Muz3LN+XofkrzMxuNvf6cYlNwG8HkWsYsG4GOOfPbVWRoSUpfYEMVuksxpEEhQ9Dgve96ZokAegvJC2uLEw1bzU3/pEQ84Df3pFFo9ZBPMdGPG+UPzSF6IRAQJuBpyHcn0NqoavaF/pipNOjtzNgxam3fsI6BP6lS0uOJd3j5dK1aZkZm2nJ5KeMibKLK45w4DihKcZZveff+zUz1p/lkDLgpqH/m0hvqaK9Xty5eg6l8btAdEs3Po8BbEIz6DkDD6sOvQ+rzOINLLKWzPAiYU83zg5tQ9gJpZ3xvdAqoC5APGEm8v5pJVY3hQ6yvgiCf4ChRYIqgpJdgrEwB8t7IWsHeRy3SzPy9Ei/wN7x7XzfxhUypC3q0JqF5XT4+PJq/S07V2D42MjgeU0Onzsag1Ye4XPpXYq836rDjbNfme+HI2qTSMCma+5cFEUKLa0VDggb9+qzuQ6022FenCzJR6ihkEdGO/OlkNXBwQ1dtR/Vo/pHchm04uJvV7DDL3FAVsta6KsuJP/6ceDd3pGfvxaeSRmbxA93et5SeP2acB2ByQmtWodb2+0jxOOV6+0FBGNFKwd4HT2Qw82hMckx3lTFEEFJkNznsZ1f7q4oqjiY4zruN/sKhSYSewyTovcIf+x31nd8lt4G21N/uTY2w3qTivJ6ufvXb0T7F2nEWSIsYcg4npDCvbcFvAIToHT66aYV4OPINCpOKxBETXUg2Q3M/+c0TnfNdk2Nj4rrU50CAGsMzGA1o654BqiT0l3efCX+uQVBtbB3Ygr+BWTc7+FvYQv/bwoW1pNj8j9Ixeb5/JRSlm50xe6Mx8W9pCTQoxDhB7JI2e/e799i5vZOglwvkcoCrmnL/DWpQGqTsNlNjn1P9oxl00SQTSuHCdTPpmQcM0eYWRT4L0AR/vPkR/zehiKtuwZ0lnBxHCnRxd4hncL85NJN57E7dMn7ckdCz/AchNu+fLr8crj0j5MTiPxVGpndtiIUsOQ3EQEE1PV9O6Zaky1SrlonbqlELioh+ZrWzxqtGv6/Fz/hst37qGYPqm3JeNzHEDdSxF8OeuCRz2Y3i5nx9Y2arNGTTVrC2pQ1Hx8GajsfQIwnQTMCD0J3G3zPkBvJ6bpGrwWJio8Ft4isX7C72T0YlWI5q088ZmR0AYUL21lhK7R/pqi3W3n4ZR39Qdy9utxcJC/KH5YpCo9u5xhxjJDOlE0YtzuMffWWfELyxu7iEBlWEajYWWnWiG7Iit7cXOenWuee0VKSvaEUIwYRX+L9Sll1Ao0cdRvDcyYc3OLGe+IrLuC7/+AIXN6kV2PuceTWfm39F5aFmlI7ud8CG3jAWFrnt/NRM8Af92dJklpWGZ3rzbIh1X/9jJfVqn92Tt1lNj4ByNMo08GEbWqZ+Y3ot+mD9sbK3TBQBDpPQwFgX1Q284j47AEmNxBynSLeS6U/nJM82ur57A00/Y6BAiZ0ib6qSYvRfFl4QJpj34E5s45sPBItcyNHhEcI7vluEqbY9xOw6+RA9nxnCV6Ue5p8f147j/p2448lB5NUOE7gn+3OWjxo6HNeYaLnnbTV+8iw278z0V6F1nLYvRdjf8WPmY5AtSFzYwW68JZqM+MKjoGBNr5y/SyCCRZ5k4TwHNsOK0OvEzsA0vBSLWpHNll62/eAdV3xMn5lWAHujB2AJ08KQI2fdWMmPclN367WMK11EDfgh4ZFBVL+GpBPgdsk4nOM9ZpTK7ecsSF4wFYHvN8rDA/czuv/HomDlWeyWuSMpx3tsKyMq1gwNKubHbS0cwJJlJZFgqMQcBZ3i9DHtw021pnNN7hIj2xAjKYSeoAhUbn0SzSEFhGCjHAxO3HcaYX8gxPKcnH8VUOTKssUvGdIR/euc/Kd9DEBBO7Ff8yQsgoVNJF04e2ASFMmYM0cDlfVLqMox1jZgF2WwwbvaBG8gHLeptvAaiSgEjcoPqcaYWr1ssCH1PpDvYpvJb40UY/PbIeFKRZaDnvfenPpMl6DIALARl06V+nzi6go9rGKU5APA97n3BFPWeLj7rtMGuT1nSQsOYG16+KlBfHp7cmvY9oaFAfxwtJr7n5hscHMKcGBxjAOYCmBqi3TUxrFrTJSQKSIEcyvrQgpdktohAVPVmoUoSXA5y+a5krP9bZGX5aKHVcxf7Ep7x91vZghsR07JuAh8TJJGswDiCEkSHrtt9njIfEakpxA6++YuLGaMjoe3g/lHbTje4Tjhs3jQliolOTFSnQBnHuzhYF+hqRHc1JT33M3oh4D086c1Sr+h8Irse1rLYcsW0UakUoLQ3DwW48TqlOGHLnngwrvveb5N3PBqvtwyoiHwSKD3OeMOjrL5h7hWJ/s4OB2e4kledMcjej1tZI7NcWw1KJ/e/4vKXk78K/IDEUX8u4Q8cOmXhSsEr44rXIEUF01ZUJjtDh/bM8rPAWbSYKQgXRdrRk/sl1BgUuefdsb3/h/vs+7VP6xG1/fEU5WUvLHx0daShfoqxXkxydzKvk8jTdJsHQVdYIMRlnOUuOAVeQd2TJnKjfWmaIiISGXaKLFsVzTqR9JWtrC9dBR0QhR/Knol4XBUUgErOtD2lcvfptqZnhK98MJ980u9rKh6+mMx2XyoFn4JUZt+VbibTrT0BQKaQqMefOYgd/ITTPnVZyWloTwTIe8i5BTg46Zx+Zx44C+HOe2Gn7Km92vsp/WAgKxGYZUlOxHh1L9NlDCEdZemQ69cpv8QaiypVTMPrlI/pjjwS9xfQcJqbH1YiZs7ULT2+cSMWTXuLxZiA/GBN1hr49dooks6OPwJ5zpGME5zn51BYt1QEZZFuzW5Afs5hn0dQE4NWEzwUqkpn7UGTsJgDsYxKXkxqyew5tvP7xnZvqfknwd15F/4FJ6992FqZfyB3d9o8YRNzjdxAI5DCrVJUkBYLvP9+NQ8VDiYqyHgPFsOtJjp60w8ZQSAKSRdiJCW2oKGlGpKwCgV6SBEHkDd5kRscBDweFodJPF4lulBW2ZNaK8dG11VtulVsfM7hbVFaucZRJL3TvufvjUWWqMFrKbMjsTA+DwouN9KsVKT/ITGd4GCV/aNsSofJAiaia9rnG2ie9kEAYjcmGLqmmRA4fA6PwI2uqbWsBYsKk/m5Jgl5SoR5PvJNUBjg5Lx1CLU5a9MoIEb1nyKiyNPc8NSeQjhykhaOnxucg2QgB8QEXIH3xIWjRttVoHPqopHThRHCJtmYsUiehELoABgvOIv8sL2FAgix+28Joi/AG0IV1kxX6FXk6QVyHSiIeSAAGoAAAAA==",
            }}
            style={styles.headerImage}
          />
 
          {}
          <View style={styles.headerOverlay} />
 
          <Text style={styles.title}>Breakfasts</Text>
 
          <TouchableOpacity style={styles.profileButton} onPress={()=> router.push("/CONFIGURACIpN-PERFIL")}>
            <Ionicons
              name="person"
              size={30}
              color="#FFFFFF"
            />
          </TouchableOpacity>
 
        </View>
 
        {}
 
        <View style={styles.searchContainer}>
 
          <TextInput
            value={search}
            onChangeText={setSearch}
            placeholder="Search food..."
            placeholderTextColor="#777"
            style={styles.searchInput}
          />
 
          <Ionicons
            name="search-outline"
            size={31}
            color="#222"
            style={styles.searchIcon}
          />
 
        </View>
 
        {
      }
 
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
 
          {filteredCategories.map((category, index) => (
 
            <TouchableOpacity
              key={index}
              activeOpacity={0.85}
              style={styles.categoryCard}
              onPress={() => {
                console.log(
                  "Selected category:",
                  category.name
                );
                if (category.name === "Nachos") {
                  router.push("/(tabs)/Nachos" as never);
                }else if (category.name === "Trail mix") {
                  router.push("/(tabs)/Nueses" as never);
                }else if (category.name === "Chicken Nuggets") {
                  router.push("/(tabs)/Nuggets" as never);
                }else if (category.name === "Toasts") {
                  router.push("/(tabs)/TOSTADAS");
                }
              }}
            >
 
              <Image
                source={{ uri: category.image }}
                style={styles.categoryImage}
              />
 
              <View style={styles.categoryOverlay} />
 
              <Text style={styles.categoryText}>
                {category.name}
              </Text>
 
              <Ionicons
                name="chevron-forward-outline"
                size={48}
                color="#FFFFFF"
                style={styles.arrow}
              />
 
            </TouchableOpacity>
 
          ))}
 
          {filteredCategories.length === 0 && (
            <View style={styles.noResults}>
              <Ionicons
                name="search-outline"
                size={50}
                color="#777"
              />
 
              <Text style={styles.noResultsText}>
                Category not found
              </Text>
            </View>
          )}
 
        </ScrollView>
 
         
 
       <View style={styles.bottomBar}>
              <TouchableOpacity style={styles.navButton} activeOpacity={0.7} onPress={() => router.push('/(tabs)/Home')}>
                <Ionicons name="home-outline" size={26} color="#111" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.navButton} activeOpacity={0.7} onPress={() => router.push('/(tabs)/CATEGORIAS')}>
                <MaterialCommunityIcons name="silverware-clean" size={26} color="#111" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.navButton} activeOpacity={0.7}>
                <Ionicons name="heart-outline" size={26} color="#111" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.navButton} activeOpacity={0.7} onPress={() => router.push('/(tabs)/inbox')}>
                <Ionicons name="clipboard-outline" size={26} color="#111" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.navButton} activeOpacity={0.7} onPress={() => router.push('/chat/${supportChatId')}>
                <FontAwesome5 name="headset" size={22} color="#111" />
              </TouchableOpacity>
            </View>
 
      </View>
    </SafeAreaView>
  );
}
 
 
 
 
const styles = StyleSheet.create({
 
  safeArea: {
    flex: 1,
    backgroundColor: "#FFD34E",
  },
 
  container: {
    flex: 1,
    backgroundColor: "#FFD34E",
  },
 
 
 
  header: {
    height: 195,
    marginHorizontal: 0,
    position: "relative",
    overflow: "hidden",
 
    borderBottomLeftRadius: 35,
    borderBottomRightRadius: 35,
  },
 
  headerImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
 
  headerOverlay: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
 
    backgroundColor: "rgba(0,0,0,0.25)",
  },
 
  title: {
    position: "absolute",
 
    width: "100%",
    textAlign: "center",
 
    top: 80,
 
    color: "#FFFFFF",
 
    fontSize: 30,
    fontWeight: "700",
 
    textShadowColor: "rgba(0,0,0,0.7)",
    textShadowOffset: {
      width: 1,
      height: 2,
    },
    textShadowRadius: 4,
  },
 
  profileButton: {
    position: "absolute",
 
    right: 18,
    top: 18,
 
    width: 48,
    height: 48,
 
    borderRadius: 24,
 
    alignItems: "center",
    justifyContent: "center",
  },
 
 
 
  searchContainer: {
    height: 55,
 
    marginHorizontal: 52,
    marginTop: -2,
    marginBottom: 22,
 
    backgroundColor: "#FFFFFF",
 
    borderRadius: 30,
 
    flexDirection: "row",
    alignItems: "center",
 
    elevation: 4,
 
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 5,
    shadowOffset: {
      width: 0,
      height: 3,
    },
  },
 
  searchInput: {
    flex: 1,
 
    height: "100%",
 
    paddingLeft: 22,
    paddingRight: 5,
 
    fontSize: 17,
 
    color: "#222",
  },
 
  searchIcon: {
    marginRight: 17,
  },
 
 
 
  scrollContent: {
    paddingHorizontal: 0,
    paddingBottom: 15,
  },
 
 
  categoryCard: {
    width: "92%",
    height: 108,
 
    alignSelf: "center",
 
    marginBottom: 20,
 
    borderRadius: 25,
 
    overflow: "hidden",
 
    position: "relative",
 
    elevation: 5,
 
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 5,
    shadowOffset: {
      width: 0,
      height: 3,
    },
  },
 
  categoryImage: {
    position: "absolute",
 
    width: "100%",
    height: "100%",
 
    resizeMode: "cover",
  },
 
  categoryOverlay: {
    position: "absolute",
 
    width: "100%",
    height: "100%",
 
    backgroundColor: "rgba(0,0,0,0.25)",
  },
 
  categoryText: {
    position: "absolute",
 
    left: 20,
    top: 28,
 
    color: "#FFFFFF",
 
    fontSize: 34,
 
    fontWeight: "800",
 
    textShadowColor: "rgba(0,0,0,0.6)",
    textShadowOffset: {
      width: 1,
      height: 2,
    },
    textShadowRadius: 4,
  },
 
  arrow: {
    position: "absolute",
 
    right: 18,
    top: 28,
  },
 
 
 
  noResults: {
    alignItems: "center",
    justifyContent: "center",
 
    marginTop: 40,
  },
 
  noResultsText: {
    marginTop: 15,
 
    fontSize: 17,
 
    color: "#555",
  },
 
 
 
  bottomNavigation: {
    height: 78,
 
    marginHorizontal: 0,
 
    backgroundColor: "#FF9D00",
 
    borderTopLeftRadius: 27,
    borderTopRightRadius: 27,
 
    flexDirection: "row",
 
    alignItems: "center",
    justifyContent: "space-around",
 
    paddingHorizontal: 5,
  },
 
  navButton: {
    flex: 1,
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
  },
 
  navText: {
    fontSize: 8,
 
    marginTop: 2,
 
    color: "#222",
  },

  bottomBar: {
    flexDirection: 'row',
    backgroundColor: '#E67E22',
    height: 60,
    justifyContent: 'space-around',
    alignItems: 'center',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
 
});
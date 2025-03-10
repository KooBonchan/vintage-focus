package com.dodream.vintageFocus.mapper;

import com.dodream.vintageFocus.dto.MemberDTO;
import com.dodream.vintageFocus.security.UserInfo;
import com.dodream.vintageFocus.vo.Member;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.time.Instant;

@Component
@RequiredArgsConstructor
public class MemberMapper {

  public Member toMember(UserInfo userInfo) {
    return Member.builder()
      .oauthProvider(userInfo.provider())
      .oauthId(userInfo.oauthId())
      .username(userInfo.username())
      .profileImage(userInfo.profileImageUrl()) // Use email if available; null otherwise
      .phone(null) // Set to null or require later input
      .address(null)
      .detailAddress(null)
      .zipcode(null)
      .role("USER") // Default role; can be customized
      .createdAt(Instant.now())
      .updatedAt(Instant.now())
      .build();
  }

  public MemberDTO toMemberDTO(Member member) {
    return MemberDTO.builder()
      .id(member.getId())
      .oauthProvider(member.getOauthProvider())
      .oauthId(member.getOauthId())
      .username(member.getUsername())
      .profileImage(member.getProfileImage())
      .phone(member.getPhone())
      .address(member.getAddress())
      .detailAddress(member.getDetailAddress())
      .zipcode(member.getZipcode())
      .isRegistered(isRegistered(member)) // Determine registration status
       .role(member.getRole()) // Uncomment if role is needed
      .build();
  }

  private boolean isRegistered(Member member) {
    return member.getPhone() != null && member.getAddress() != null && member.getDetailAddress() != null;
  }
}

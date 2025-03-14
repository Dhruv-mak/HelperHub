import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { EditOrganizationProfile } from "./EditOrganizationProfile";
import { useAuth } from "@/contexts/auth-context";
import api from "@/lib/axios";
import { MemoryRouter } from "react-router-dom"; 

vi.mock("@/lib/axios", () => {
  return {
    default: {
      put: vi.fn(),
    }
  };
});


vi.mock("@/contexts/auth-context", () => ({
  useAuth: vi.fn(),
}));

describe("EditOrganizationProfile Component", () => {
  
  let mockUser: any;
  let mockUpdateUser: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    mockUser = {
      email: "test@org.com",
      name: "Test Org",
      phone: "1234567890",
      location: "123 Main St",
      description: "A great organization",
    };

    mockUpdateUser = vi.fn();

    vi.mocked(useAuth).mockReturnValue({
      user: mockUser,
      isAuthenticated: true,
      isLoading: false,
      login: vi.fn(),
      logout: vi.fn(),
      registerVolunteer: vi.fn(),
      registerOrganization: vi.fn(),
      updateUser: mockUpdateUser,
    });

    vi.mocked(api.put).mockResolvedValue({ data: { success: true } });
  });

  /** Test 1: Checking if "Edit Profile" button renders */
  it("renders the Edit Profile button", () => {
    render(
      <MemoryRouter> 
        <EditOrganizationProfile />
      </MemoryRouter>
    );
    expect(screen.getByText("Edit Profile")).toBeInTheDocument();
  });

  /** Test 2: Check if clicking "Edit Profile" opens the dialog */
  it("opens the dialog when clicking Edit Profile", () => {
    render(
      <MemoryRouter> 
        <EditOrganizationProfile />
      </MemoryRouter>
    );
    fireEvent.click(screen.getByText("Edit Profile"));
    expect(screen.getByText("Edit Organization Profile")).toBeInTheDocument();
  });

  /** Test 3: Ensure form is pre-filled with user data */
  it("pre-fills the form with user data", () => {
    render(
      <MemoryRouter>
        <EditOrganizationProfile />
      </MemoryRouter>
    );
    fireEvent.click(screen.getByText("Edit Profile"));

    expect(screen.getByDisplayValue(mockUser.email)).toBeInTheDocument();
    expect(screen.getByDisplayValue(mockUser.name)).toBeInTheDocument();
    expect(screen.getByDisplayValue(mockUser.phone)).toBeInTheDocument();
    expect(screen.getByDisplayValue(mockUser.location)).toBeInTheDocument();
    expect(screen.getByDisplayValue(mockUser.description)).toBeInTheDocument();
  });

  /** Test 4: Allow editing form fields */
  it("allows editing form fields", () => {
    render(
      <MemoryRouter>
        <EditOrganizationProfile />
      </MemoryRouter>
    );
    fireEvent.click(screen.getByText("Edit Profile"));

    const nameInput = screen.getByDisplayValue(mockUser.name);
    fireEvent.change(nameInput, { target: { value: "Updated Org" } });

    expect(nameInput).toHaveValue("Updated Org");
  });
});
